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
              <md-card-content>
                <md-table
                  :value="queriedData"
                  :md-sort.sync="currentSort"
                  :md-sort-order.sync="currentSortOrder"
                  :md-sort-fn="customSort"
                  class="paginated-table table-striped table-hover"
                >
                  <md-table-toolbar>
                    <!-- <md-field>
                      <label for="pages">Per page</label>
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
                    </md-field> -->

                    <md-field>
                      <md-input
                        type="search"
                        class="mb-3"
                        clearable
                        style="width: 200px"
                        :placeholder="`Pesquisar ${title}`"
                        v-model="searchQuery"
                      >
                      </md-input>
                    </md-field>
                  </md-table-toolbar>
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell
                      v-for="(field, index) in fields"
                      :key="index"
                      :md-label="field.name"
                      md-sort-by="name"
                      >{{ item[field.field] }}</md-table-cell
                    >
                    <md-table-cell md-label="Actions">
                      <div class="da-md-table-cell-actions">
                        <md-button
                          @click="title == 'Horários' ? deleteHorario(item._id) : ''"
                          v-if="restrictTo(0)"
                          class="md-just-icon md-danger md-simple"
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
  name: "table-model",
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
      default: "Categorias",
    },
    fields: {
      type: Array,
      default: function () {
        return ["1"];
      },
    },
    items: {
      type: Array,
      default: function () {
        return [{ 1: "-" }];
      },
    },
  },
  components: {
    Pagination,
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
      footerTable: ["Name", "Email", "Idade"],
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      newItem: null,
    };
  },
  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    deleteHorario(item) {
      Swal.fire({
        title: "Tem a certeza que deseja eliminar este horário?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
      }).then((result) => {
        if (result.value) {
          const newHorario=this.items.filter(el=>el._id!=item);
          this.$emit("changeHorario",newHorario);
        }
      });
      
    },
    addItem() {},
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
    handleDelete(item) {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "md-button md-success btn-fill",
        cancelButtonClass: "md-button md-danger btn-fill",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.deleteRow(item);
          Swal.fire({
            title: "Deleted!",
            text: `You deleted ${item.name}`,
            type: "success",
            confirmButtonClass: "md-button md-success btn-fill",
            buttonsStyling: false,
          });
        }
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
    getFooterTable() {
      return [...this.footerTable, "-"];
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3,
    });
    this.tableData = this.items;
    this.footerTable = this.fields;
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
    items(values) {
      this.tableData = this.items;
    },
    fields(values) {
      this.footerTable = values;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
#btn-add {
  width: 2% !important;
  height: 74% !important;
}
.da-md-table-cell-actions button {
  margin-right: 20px;
}
</style>
