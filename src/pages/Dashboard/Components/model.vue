<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Detalhes do Cliente</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Nome</label>
                    <md-input
                      v-model="clienteData.cliente.nome"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Nacionalidade</label>
                    <md-input
                      v-model="clienteData.cliente.nacionalidade"
                      type="email"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Naturalidade</label>
                    <md-input
                      v-model="clienteData.cliente.naturalidade"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Género</label>
                    <md-input
                      v-model="clienteData.cliente.genero"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Data de Nascimento</label>
                    <md-input
                      v-model="clienteData.cliente.dataNascimento"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Tipo de Cliente</label>
                    <md-input
                      v-model="clienteData.cliente.tipoCliente"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Tipo de Empresa</label>
                    <md-input
                      v-model="clienteData.cliente.tipoEmpresa"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                  <md-field>
                    <label>Residente Cambial</label>
                    <md-input
                      :value="
                        clienteData.cliente.residenteCambial ? 'Sim' : 'Não'
                      "
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>

                <div
                  v-show="
                    clienteData.listaEmails &&
                      Array.isArray(clienteData.listaEmails)
                  "
                  v-for="(email, index) in clienteData.listaEmails"
                  :key="'email-' + index"
                  class="md-layout-item md-small-size-100 md-size-33"
                >
                  <md-field>
                    <label>Email</label>
                    <md-input
                      v-model="email.email"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>

                <div
                  v-show="
                    clienteData.listaTelefones &&
                      Array.isArray(clienteData.listaTelefones)
                  "
                  v-for="(telefone, index) in clienteData.listaTelefones"
                  :key="'telefone-' + index"
                  class="md-layout-item md-small-size-100 md-size-25"
                >
                  <md-field>
                    <label>Telefone</label>
                    <md-input
                      v-model="telefone.telefone"
                      type="text"
                      disabled
                    ></md-input>
                  </md-field>
                </div>

                <div
                  v-show="
                    clienteData.listaIdentificacoes &&
                      Array.isArray(clienteData.listaIdentificacoes)
                  "
                  v-for="(doc, index) in clienteData.listaIdentificacoes"
                  :key="'ident-' + index"
                  class="md-layout-item md-small-size-100 md-size-50"
                >
                  <div class="md-layout">
                    <div class="md-layout-item md-size-50">
                      <md-field>
                        <label>Tipo de Documento</label>
                        <md-input
                          v-model="doc.tipoDocumento"
                          type="text"
                          disabled
                        ></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                      <md-field>
                        <label>Numero de Documento</label>
                        <md-input
                          v-model="doc.numeroDocumento"
                          type="text"
                          disabled
                        ></md-input>
                      </md-field>
                    </div>
                  </div>
                </div>

                <div
                  v-show="
                    clienteData.listaEnderecos &&
                      Array.isArray(clienteData.listaEnderecos)
                  "
                  v-for="(divgeo, index) in clienteData.listaEnderecos"
                  :key="'endereco-' + index"
                  class="md-layout-item md-small-size-100 md-size-50"
                >
                  <div class="md-layout">
                    <div class="md-layout-item md-size-50">
                      <md-field>
                        <label>Codigo Divisão Geografica</label>
                        <md-input
                          v-model="divgeo.codigoDivisaoGeografica"
                          type="text"
                          disabled
                        ></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                      <md-field>
                        <label>Endereço</label>
                        <md-input
                          v-model="divgeo.endereco"
                          type="text"
                          disabled
                        ></md-input>
                      </md-field>
                    </div>
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('hide-dialog', false)"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("clienteModule");
export default {
  name: "model",
  props: {
    showDialogProp: {
      type: Boolean,
      default: true,
    },
    headerColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showDialog: this.showDialogProp,
      clienteData: {
        cliente: {
          naturalidade: null,
          tipoCliente: null,
          tipoEmpresa: null,
          genero: null,
          profissao: null,
          numeroCliente: null,
          nome: null,
          nacionalidade: null,
          dataNascimento: null,
          residenteCambial: null,
        },
        listaTelefones: [],
        listaEmails: [],
        listaEnderecos: [],
        listaIdentificacoes: [],
      },
    };
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    setClientData(clienteData) {
      Object.keys(clienteData).forEach((key) => {
        if (key in clienteData) {
          this.clienteData[key] = clienteData[key];
        }
      });
    },
  },
  computed: {
    getClient() {
      return this.cliente;
    },
    ...mapGetters({
      clienteStore: "getCliente",
    }),
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
    },
    clienteStore(value) {
      this.setClientData(value);
    },
  },
  mounted() {
    this.setClientData(this.clienteStore);
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
