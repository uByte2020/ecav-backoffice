<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>date_range</md-icon>
          </div>
          <p class="category">Marcações Confirmadas</p>
          <h3 class="title">
            <animated-number :value="getTotalMarcacaoesConfirmadas"></animated-number>
          </h3>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>date_range</md-icon>
          </div>
          <p class="category">Marcações Pendentes</p>
          <h3 class="title">
            <animated-number :value="getTotalMarcacaoesPendentes"></animated-number>
          </h3>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <md-icon>date_range</md-icon>
          </div>
          <p class="category">Marcações Realizadas</p>
          <h3 class="title">
            <animated-number :value="getTotalMarcacaoesRealizadas"></animated-number>
          </h3>
        </template>
      </stats-card>
    </div>

    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="rose">
        <template slot="header">
          <div class="card-icon">
            <md-icon>date_range</md-icon>
          </div>
          <p class="category">Marcações Canceladas</p>
          <h3 class="title">
            <animated-number :value="getTotalMarcacaoesCanceladas"></animated-number>
          </h3>
        </template>
      </stats-card>
    </div>
  </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import { mapGetters, mapActions } from "vuex";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable,
} from "@/components";

export default {
  components: {
    StatsCard,
    AnimatedNumber,
  },
  data() {
    return {
      totalMarcacaoesPendentes: 0,
      totalMarcacaoesConfirmadas: 0,
      totalMarcacaoesRealizadas: 0,
      totalMarcacaoesCanceladas: 0
    };
  },
  computed: {
    ...mapGetters({
      marcacoes: "marcacaoModule/getAll",
    }),
    getTotalMarcacaoesPendentes() {
        return this.totalMarcacaoesPendentes;
    },
    getTotalMarcacaoesConfirmadas() {
        return this.totalMarcacaoesConfirmadas;
    },
    getTotalMarcacaoesRealizadas() {
      return this.totalMarcacaoesRealizadas;
    },
    getTotalMarcacaoesCanceladas() {
      return this.totalMarcacaoesCanceladas;
    },
  },
  methods:{
    setTotalMarcacaoesPendentes(marcacoes) {
      this.totalMarcacaoesPendentes = marcacoes.filter((el) => el.estado.estadoCode == 3).length || 0;
      // console.log(this.totalMarcacaoesPendentes)
    },
    setTotalMarcacaoesConfirmadas(marcacoes) {
      this.totalMarcacaoesConfirmadas = marcacoes.filter((el) => el.estado.estadoCode == 1).length || 0;
    },
    setTotalMarcacaoesRealizadas(marcacoes) {
      this.totalMarcacaoesRealizadas = marcacoes.filter((el) => el.estado.estadoCode == 2).length || 0;
    },
    setTotalMarcacaoesCanceladas(marcacoes) {
      this.totalMarcacaoesCanceladas = marcacoes.filter((el) => el.estado.estadoCode == 4).length || 0;
    },
  },
  watch:{
    marcacoes(values){
      this.setTotalMarcacaoesPendentes(values);
      this.setTotalMarcacaoesConfirmadas(values);
      this.setTotalMarcacaoesRealizadas(values);
      this.setTotalMarcacaoesCanceladas(values);
    }
  },
  mounted(){
    this.setTotalMarcacaoesPendentes(this.marcacoes);
    this.setTotalMarcacaoesConfirmadas(this.marcacoes);
    this.setTotalMarcacaoesRealizadas(this.marcacoes);
    this.setTotalMarcacaoesCanceladas(this.marcacoes);
  }
};
</script>
