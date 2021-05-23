<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Formações</h4>
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
                  v-show="restrictTo(0)"
                  >Adicionar Formação</md-button
                >
              </md-field>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Formação" md-sort-by="name">
                {{
                  item.nome
                }}</md-table-cell>
              <md-table-cell md-label="Quantide de Alunos" md-sort-by="aula">
                {{ item.quantidadeAlunoMax }}</md-table-cell
              >
              <md-table-cell md-label="Instrutores">
                <a class="da-link" @click="showModalFormadoresFormacao(item.formadores)">Ver Formadores</a>  
              </md-table-cell>
              <md-table-cell md-label="Categorias">
                <a class="da-link" @click="showTableModal(item.categorias, modalTypes.CATEGORY)">Ver Categorias</a>  
              </md-table-cell>
              <md-table-cell md-label="Licões">
                <a class="da-link" @click="showTableModal(item.licoes, modalTypes.LICAO)">Ver Lições</a>  
              </md-table-cell>
              <md-table-cell md-label="Horarios">
                <a class="da-link" @click="showTableModal(item.horarios, modalTypes.HORARIO)">Ver Horários</a>  
              </md-table-cell>
              <md-table-cell md-label="Actions">
                <md-button v-show="restrictTo(0)" class="md-just-icon md-warning md-simple" @click="callFormacaoDetalhe(item)">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button v-show="restrictTo(0)" class="md-just-icon md-danger md-simple">
                  <md-icon>close</md-icon>
                </md-button>
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
      <users-table-model 
        :showDialogProp="modalFormadoresFormacao"
        @hide-dialog="setModalFormadoresFormacao"
        :users="getFormadoresByFormacao"/>
      
      <!-- 
      <licoes-table-model 
        :showDialogProp="modalFormadoresFormacao"
        @hide-dialog="setModalFormadoresFormacao"
        :users="getFormadoresByFormacao"/>-->

      <table-model 
        :showDialogProp="isModalVisible"
        @hide-dialog="hideModal"
        :fields="getItemsFields"
        :items="getItems"
        :title="getTitle"/>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import modalType from "@/utils/modalType";
import diaSemana from "@/utils/diaSemana";
import Fuse from "fuse.js";
import Swal from "sweetalert2";
import UsersTableModel from "../Components/UsersTableModel";
import TableModel from "../Components/TableModel";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Pagination,
    UsersTableModel,
    TableModel
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
      formadoresFromFormacao: [],
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
      modalFormadoresFormacao: false,
      modalCategoriesFormacao: false,
      modalLicoesFormacao: false,
      modalHorariosFormacao: false,
      modalTypes: modalType,
      items: [{'1':'-'}],
      fields: ['1'],
      title: 'Formadores',
      diasDaSemana:diaSemana.diasSemana,
    };
  },
  methods: {
    setModalFormadoresFormacao(value){
      this.modalFormadoresFormacao = value;
    },
    setModalStatus(value, field){
      this[field] = value;
    },
    hideModal(){
      this.isModalVisible = false;
    },
    showModal() {
      this.isModalVisible = true;
    },
    showModalFormadoresFormacao(formadores) {
      if(!formadores) formadores = [];
      this.formadoresFromFormacao = formadores;
      this.setModalFormadoresFormacao(true);
    },
    showTableModal(items, type) {
      switch(type){
        case this.modalTypes.CATEGORY:
          this.setItems(items);
          this.setItemsFields([{field:'categoria', name:'Categoria'}]);
          this.setTitle("Categorias");
          break;
        case this.modalTypes.HORARIO:
          this.setItems(items.map(el=>{
            el.nomeDia = (this.diasDaSemana.find(d=>d.dia==el.diaSemana).nome)||el.diaSemana;
            return el;
          }));
          this.setItemsFields([{field:'nomeDia', name:'Dia da Semana'}, {field:'hora', name:'Hora'},{field:'duracao', name:'Duracao'}]);
          this.setTitle("Horários");
          break;
        case this.modalTypes.LICAO:{
          this.setItems(items.map(el=>{return {nome:el.nome, categoria: el.categoria.categoria||'-'}}));
          this.setItemsFields([{field:'nome', name:'nome'}, {field:'categoria', name:'Categoria'}]);
          this.setTitle("Lições");
          break;
        }
      }
      this.showModal();
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
    getFormacaoByLicao(licao) {
      if (licao && licao.formacao) return licao.formacao.nome;
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
    setItems(items){
      this.items = items;
    },
    setItemsFields(fields){
      this.fields = fields;
    },
    setTitle(title){
      this.title = title;
    },
    callFormacaoDetalhe(formacao){
      this.$router.push({ path: `formacoes-detalhe/${formacao._id}`, params: { formacaoId:formacao._id } })
    }
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      formacoes: "formacaoModule/getAll",
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
    getFormadoresByFormacao(){
      return this.formadoresFromFormacao;
    },
     getItems(){
      return this.items;
    },
    getItemsFields(){
      return this.fields;
    },
    getTitle(){
      return this.title;
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3,
    });
    this.tableData = this.formacoes;
  },
  watch: {
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
    formacoes(values) {
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
.da-link{
  cursor: pointer;
}
</style>
