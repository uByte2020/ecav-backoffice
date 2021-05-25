<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Lições</h4>
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
              <md-field>
                <md-button
                  class="md-success"
                  @click="showModal"
                  v-show="restrictTo(0)"
                  >Adicionar Lição</md-button
                >
              </md-field>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Lição" md-sort-by="name">
                {{ item.nome }}
              </md-table-cell>
              <md-table-cell md-label="Categoria">
                {{ getCategoriaByLicao(item.categoria) }}</md-table-cell
              >
              <md-table-cell md-label="Formação" md-sort-by="aula">
                {{ getFormacaoByLicao(item.formacao) }}</md-table-cell
              >
              <!-- <md-table-cell md-label="Estado">{{
                item.estado.estado
              }}</md-table-cell> -->
              <md-table-cell md-label="Actions">
                <div class="da-md-table-cell-actions">
                  <md-button
                    v-show="restrictTo(0)"
                    class="da-btn-action md-just-icon md-warning md-simple"
                    @click="callFormacaoDetalhe(item)"
                  >
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button
                    @click="apagarLicao(item._id, item)"
                    v-if="restrictTo(0)"
                    class="md-just-icon md-danger md-simple"
                  >
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="footer-table md-table"></div>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
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
      <add-licao-model
        :showDialogProp="isModalVisible"
        @hide-dialog="setIsModalVisible"
      />
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import AddLicaoModel from "../Components/AddLicaoModel";
import UsersTableModel from "../Components/UsersTableModel";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Pagination,
    AddLicaoModel,
    // UsersTableModel
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      licoes: "licaoModule/getAll",
    }),
    restrictTo() {
      return this.restricao;
    },
    identity() {
      if (this.restrictTo(0, 1)) return "Aluno";
      else return "Instrutor";
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
    getAlunosByMarcacao() {
      return this.alunosFromMarcacao;
    },
  },
  data() {
    return {
      aluno: true,
      currentSort: "name",
      currentSortOrder: "asc",
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      alunosFromMarcacao: [],
      footerTable: [
        "Aluno",
        "Formação",
        "Categoria",
        "Lição",
        "Data",
        "Formação",
        "Hora",
        "Estado",
        "Actions",
      ],
      searchQuery: "",
      propsToSearch: ["name", "formação", "data"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      isModalVisible: false,
      modalAlunosMarcacao: false,
    };
  },
  methods: {
    ...mapActions({
      deleteLicao: "licaoModule/deleteLicao",
      getAll: "licaoModule/getAll",
    }),
    apagarLicao(id, licao) {
      Swal.fire({
        title: "Tem a certeza que deseja eliminar está lição?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      }).then((result) => {
        if (result.value) {
          this.deleteLicao({ licaoId: id })
            .then((response) => {
              this.notifyVue("A lição foi eliminada", "success");
              this.getAll();
              this.$emit("hide-dialog", false);
            })
            .catch((error) => {
              const message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.notifyVue(message, "danger");
            });
        }
      });
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
    setModalAlunosMarcacao(value) {
      this.modalAlunosMarcacao = value;
    },
    showModal() {
      this.isModalVisible = true;
    },
    showModalAlunosMarcacao(alunos) {
      if (!alunos) alunos = [];
      this.alunosFromMarcacao = alunos;
      this.setModalAlunosMarcacao(true);
    },
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
    getMarcacaoUserName(user) {
      if (user) return user.name;
      return "";
    },
    getFormacaoByLicao(formacao) {
      if (formacao) return formacao.nome;
      return "";
    },
    getCategoriaByLicao(categoria) {
      if (categoria) return categoria.categoria;
      return "";
    },
    getDate(date) {
      if (!date) return "";
      return date.split("T")[0];
    },
    getTime(date) {
      if (!date) return "";
      const time = date.split("T")[1];
      return time.split(".")[0];
    },
    getLicaoName(licao) {
      return licao ? licao.nome : "";
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3,
    });
    this.tableData = this.licoes;
  },
  watch: {
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
    licoes(values) {
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
.da-md-table-cell-actions button {
  margin-right: 2px;
}
</style>
