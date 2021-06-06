<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Marcações</h4>
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
                  v-if="restrictTo(2)"
                  >Criar Marcação</md-button
                >
              </md-field>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell
                v-if="restrictTo(0, 2)"
                :md-label="identity"
                md-sort-by="name"
              >
                {{ getMarcacaoUserName(item.formador) }}</md-table-cell
              >
              <md-table-cell md-label="Formação" md-sort-by="aula">
                {{ getFormacaoByLicao(item.licao) }}</md-table-cell
              >
              <md-table-cell md-label="Categoria">
                {{ getCategoriaByLicao(item.licao) }}</md-table-cell
              >
              <md-table-cell md-label="Lição">{{
                getLicaoName(item.licao)
              }}</md-table-cell>
              <md-table-cell md-label="Data">{{
                getDate(item.data)
              }}</md-table-cell>
              <md-table-cell md-label="Hora">{{
                getTime(item.data)
              }}</md-table-cell>
              <md-table-cell md-label="Estado">{{
                item.estado.estado
              }}</md-table-cell>
              <md-table-cell
                v-if="restrictTo(0, 1)"
                md-label="Alunos"
                md-sort-by="name"
              >
                <a class="da-link" @click="showModalAlunosMarcacao(item.alunos)"
                  >Ver Alunos</a
                >
              </md-table-cell>
              <md-table-cell md-label="Actions" v-if="restrictTo(0,1)">
                <div
                  class="da-md-table-cell-actions"
                >
                  <md-button
                    v-if="restrictTo(0, 1) && item.estado.estado == 'Pendente'"
                    @click="updateMarcacao(item._id, 1)"
                    class="md-just-icon md-round md-info da-btn"
                  >
                    <md-icon>thumb_up</md-icon>
                  </md-button>
                    <md-button
                    v-if="restrictTo(0, 1) && item.estado.estado == 'Confirmado'"
                    @click="updateMarcacao(item._id, 2)"
                    class="md-just-icon md-round md-primary md-info da-btn"
                  >
                    <md-icon>done</md-icon>
                  </md-button>
                  <md-button
                    v-if="restrictTo()"
                    class="md-just-icon md-round md-warning da-btn"
                  >
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button
                    v-if="
                      restrictTo(0, 1) &&
                      item.estado.estado != 'Cancelado' &&
                      item.estado.estado != 'Realizado'
                    "
                    @click="updateMarcacao(item._id, 4)"
                    class="md-just-icon md-round md-danger da-btn"
                  >
                    <md-icon>close</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
              <md-table-cell v-if="restrictTo(2)">
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
      <marcacao-model
        :showDialogProp="isModalVisible"
        @hide-dialog="setIsModalVisible"
      />
      <users-table-model
        :showDialogProp="modalAlunosMarcacao"
        @hide-dialog="setModalAlunosMarcacao"
        :users="getAlunosByMarcacao"
        :title="title"
      />
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import MarcacaoModel from "../Components/MarcacaoModel";
import UsersTableModel from "../Components/UsersTableModel";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Pagination,
    MarcacaoModel,
    UsersTableModel,
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      marcacoes: "marcacaoModule/getAll",
      token: "userModule/getToken",
    }),
    restrictTo() {
      return this.restricao;
    },
    identity() {
      return "Instrutor";
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
      title: "Alunos",
      modalAlunosMarcacao: false,
    };
  },
  methods: {
    ...mapActions({
      updateMarcacaoState: "marcacaoModule/updateMarcacaoState",
      getMyMarcacoes: "marcacaoModule/getMyMarcacoes",
      getAllMarcacoes: "marcacaoModule/getAll",
    }),
    async updateMarcacao(id, state) {
      if (state === 1) {
        this.atualizarMarcacao(id, state);
      } else if (state === 4) {
        Swal.fire({
          title: "Tem a certeza que deseja cancelar está marcação?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, cancelar",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.value) {
            this.atualizarMarcacao(id, state);
          }
        });
      } else if (state === 2) {
        Swal.fire({
          title: "Tem a certeza que deseja dar está marcação como realizada?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.value) {
            this.atualizarMarcacao(id, state);
          }
        });
      }
    },
    atualizarMarcacao(id, state) {
      this.updateMarcacaoState({ id, state })
        .then((response) => {
          this.notifyVue(
            `Marcação ${
              state == 1
                ? "Confirmada"
                : state == 4
                ? "Cancelada"
                : state == 2
                ? "dada como realizada"
                : "Pendente"
            }`,
            state == 1
              ? "success"
              : state == 4
              ? "danger"
              : state == 2
              ? "success"
              : "warning"
          );
          this.$emit("hide-dialog", false);
          this.restrictTo(0) ? this.getAllMarcacoes() : this.getMyMarcacoes();
        })
        .catch((error) => {
          const message =error.response?.data?.message ||
              error.message ||
              error.toString();
          this.notifyVue(message, "danger");
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
    getFormacaoByLicao(licao) {
      if (licao && licao.formacao_detalhe) return licao.formacao_detalhe.nome;
      return "";
    },
    getCategoriaByLicao(licao) {
      if (licao && licao.categoria) return licao.categoria.categoria;
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
    this.tableData = this.marcacoes;
  },
  watch: {
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
    marcacoes(values) {
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
