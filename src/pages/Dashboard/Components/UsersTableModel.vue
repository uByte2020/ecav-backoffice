<template>
  <div ref="marcacaoModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
      :md-fullscreen="true"
    >
      <md-dialog-title>{{ title }}</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-card>
              <!-- <md-card-header class="md-card-header-icon md-card-header-green">
                <div class="card-icon">
                  <md-icon>assignment</md-icon>
                </div>
                <h4 class="title">Alunos</h4>
              </md-card-header> -->
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
                      <label for="pages">Por página</label>
                      <md-select v-model="pagination.perPage" name="pages">
                        <md-option
                          v-for="item in pagination.perPageOptions"
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
                    <md-table-cell md-label="Acções">
                      <div class="da-md-table-cell-actions">
                        <md-button
                          class="md-just-icon md-round md-danger"
                          @click.native="handleDelete(item._id)"
                        >
                          <md-icon>delete</md-icon>
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
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-warning" @click="$emit('hide-dialog', false)"
          >Fechar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "users-table-model",
  props: {
    showDialogProp: {
      type: Boolean,
      default: true,
    },
    headerColor: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "Formadores",
    },
    users: {
      type: Array,
      default: function () {
        return [];
      },
    },
    currentFormation: {
      type: String,
      default: "",
    },
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
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
  },
  data() {
    return {
      currentSort: "name",
      currentSortOrder: "asc",
      showDialog: this.showDialogProp,
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      footerTable: ["Name", "Email", "Idade", "Actions"],
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
    };
  },
  methods: {
    ...mapActions({
      deleteFormadorFormacao: "formacaoModule/updateFormadores",
      getAll: "formacaoModule/getAll",
    }),
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    handleLike(item) {
      Swal.fire({
        title: `You liked ${item.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "md-button md-success",
      });
    },
    handleEdit(item) {
      Swal.fire({
        title: `You want to edit ${item.name}`,
        buttonsStyling: false,
        confirmButtonClass: "md-button md-info",
      });
    },
    async handleDelete(id) {
      const newFormadores = await this.tableData.filter((el) => el._id != id);
      if (newFormadores.length === 0) {
        this.notifyVue(
          `Existe apenas um ${this.title==="Formadores" ? 'formador':'aluno'} nesta formação, ele não pode ser eliminado`,
          "warning"
        );
      } else {
        Swal.fire({
          title: "Tem a certeza que deseja eliminar este formador?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.value) {
            this.deleteFormadorFormacao({
              formacaoId: this.currentFormation,
              formadores: newFormadores,
            })
              .then((response) => {
                this.getAll();
                this.notifyVue("O formador foi eliminado", "success");
                this.$emit("hide-dialog", false);
              })
              .catch((error) => {
                const message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              });
          }
        });
      }
    },
    notifyVue(message, type) {
      this.$notify({
        timeout: 2500,
        message,
        icon: "add_alert",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: type,
      });
    },
    deleteRow(item) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === item.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
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
    showDialogProp(value) {
      this.showDialog = value;
      if (!this.showDialog) {
        this.marcacao = {
          formador: null,
          categoria: null,
          licao: null,
          formacao: null,
          data: null,
          hora: null,
        };
      }
    },
    users(values) {
      this.tableData = this.users;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
.da-md-table-cell-actions {
  width: 100% !important;
  display: flex !important;
  justify-content: space-around !important;
}
</style>
