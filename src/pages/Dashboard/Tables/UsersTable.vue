<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Utilizadores</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="customSort"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <label for="pages">Perfis</label>
                <md-select
                  v-model="perfil"
                  name="pages"
                  @md-selected="onSelectPerfil"
                >
                  <md-option
                    v-for="item in getPerfis"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    {{ item }}
                  </md-option>
                </md-select>
              </md-field>

              <md-field>
                <md-input
                  type="search"
                  class="mb-3"
                  clearable
                  style="width: 200px"
                  placeholder="Search records"
                  v-model="searchQuery"
                >
                </md-input>
              </md-field>

              <!---->
              <md-field>
                <md-button
                  class="md-success"
                  @click="setIsModalVisible(true)"
                  v-show="restrictTo(0)"
                  >Registrar Utilizador</md-button
                >
              </md-field>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Nome" md-sort-by="name">{{
                item.name
              }}</md-table-cell>
              <md-table-cell md-label="Email" md-sort-by="email">{{
                item.email
              }}</md-table-cell>
              <md-table-cell md-label="Telemovel">
                {{ item.telemovel }}</md-table-cell
              >
              <md-table-cell md-label="Endereço">{{
                item.endereco[0]
              }}</md-table-cell>
              <md-table-cell md-label="Perfil">{{
                getRole(item.role)
              }}</md-table-cell>
              <md-table-cell md-label="Estado">{{
                getAccountState(item.isBloqued)
              }}</md-table-cell>
              <md-table-cell md-label="Actions">
                <div class="da-md-table-cell-actions" >
                  <md-button
                    v-if="!item.isBloqued"
                    class="md-just-icon md-round md-info"
                    @click.native="handleStateChange(item._id, true)"
                  >
                    <md-icon>lock_open</md-icon>
                  </md-button>
                  <md-button
                    v-if="item.isBloqued"
                    class="md-just-icon md-round md-danger"
                    @click.native="handleStateChange(item._id, false)"
                  >
                    <md-icon>lock</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">
              Mostrando {{ from + 1 }} - {{ to }} de {{ total }} entradas
            </p>
          </div>
          <pagination
            class="pagination-no-border pagination-success"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>
    <add-user-model
      :showDialogProp="isModalVisible"
      @hide-dialog="setIsModalVisible"
    />
  </div>
</template>

<script>
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";

import { mapGetters, mapActions } from "vuex";
import AddUserModel from "../Components/AddUserModel";

export default {
  components: {
    Pagination,
    "add-user-model": AddUserModel,
  },
  data() {
    return {
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      perfil: "",
      currentSort: "name",
      currentSortOrder: "asc",
      footerTable: ["Name", "Email", "Telemovel", "Actions"],
      searchQuery: "",
      propsToSearch: ["name", "email", "Telemovel"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      isModalVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      users: "userModule/getAll",
      perfis: "perfilModule/getAll",
    }),
    restrictTo() {
      return this.restricao;
    },
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
    getPerfis() {
      return !this.perfis
        ? []
        : ["Todos", ...this.perfis.map((el) => el.perfil)];
    },
  },
  methods: {
    ...mapActions({
      updateUserState: "userModule/updateUserState",
      getUsers: "userModule/getAll",
    }),
    setIsModalVisible(option) {
      this.isModalVisible = option;
    },
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    handleLike(item) {},
    handleEdit(item) {},
    handleStateChange(id, state) {
      if (state) {
        Swal.fire({
          title: "Tem a certeza que deseja bloquear a conta deste usuário?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.value) {
            this.changeState(id, state);
          }
        });
      } else {
        Swal.fire({
          title: "Tem a certeza que deseja activar a conta deste usuário?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.value) {
            this.changeState(id, state);
          }
        });
      }
    },
    changeState(id, state) {
      this.updateUserState({ id, state })
        .then((response) => {
          this.getUsers();
        })
        .catch((error) => {
          const message =error.response?.data?.message ||
              error.message ||
              error.toString();
          this.notifyVue(message, "danger");
        });
    },
    deleteRow(item) {},
    getRole(role) {
      if (!role) return "";
      return role.perfil;
    },
    getAccountState(item) {
      if (!item) return "Activo";
      return "Bloqueado";
    },
    onSelectPerfil(perfil) {
      if (perfil == "Todos") this.tableData = this.users;
      else this.tableData = this.users.filter((el) => el.role.perfil == perfil);
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3,
    });
    this.tableData = this.users;
  },
  watch: {
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
    users(values) {
      this.tableData = values;
    },
  },
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
.btn {
  width: 100%;
  color: white;
  background: green;
  border: 1px solid green;
  border-radius: 2px;
  cursor: pointer;
  height: 30px;
}
.btn:hover {
  background-color: #307539;
  color: #fff;
  border: none;
  border-radius: 2px;
  height: 30px;
}
.da-link {
  cursor: pointer;
}
.da-md-table-cell-actions{
  width: 100% !important;
  display: flex !important;
  justify-content: space-around !important;
}
.da-md-table-cell-actions .da-btn{
  margin:2px !important;
}
</style>
