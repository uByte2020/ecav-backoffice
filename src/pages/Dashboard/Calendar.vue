<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-80 mx-auto">
        <md-card class="md-card-calendar">
          <md-card-content>
            <fullCalendar
              ref="calendar"
              defaultView="dayGridMonth"
              :plugins="calendarPlugins"
              :events="getEvents"
              :selectable="true"
              :header="header"
              :buttonIcons="buttonIcons"
              :selectHelper="true"
              :editable="false"
              :slotLabelFormat="slotLabelFormat"
            />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Swal from "sweetalert2";
import { mapGetters, mapActions } from "vuex";

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

export default {
  components: {
    FullCalendar,
  },
  props: {},
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      header: {
        // center: "dayGridMonth,timeGridWeek,timeGridDay",
        right: "prev,next,today",
      },
      buttonIcons: {
        close: "fa-times",
        prev: "left-single-arrow",
        next: "right-single-arrow",
        prevYear: "fa-angle-double-left",
        nextYear: "fa-angle-double-right",
      },
      slotLabelFormat: {
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: true,
        meridiem: "short",
      },
      events: [],
    };
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      marcacoes: "marcacaoModule/getAll",
    }),
    getEvents() {
      return this.events;
    },
  },
  methods: {
    /*dateClick: function(info) {
      // on select we show the Sweet Alert modal with an input
      Swal.fire({
        title: "Create an Event",
        html: `<div class="md-field md-theme-default">
          <input type="text" id="md-input" class="md-input">
          </div>`,
        showCancelButton: true,
        confirmButtonClass: "md-button md-success",
        cancelButtonClass: "md-button md-danger",
        buttonsStyling: false,
      }).then(() => {
        var eventTitle = document.getElementById("md-input").value;
        if (eventTitle) {
          let calendarApi = this.$refs.calendar.getApi();
          calendarApi.addEvent({
            title: eventTitle,
            start: info.dateStr,
            allDay: true,
          });
        }
      });
    },*/
    setEvents(marcacoes) {
      this.events = marcacoes.map((el) => {
        const event = {
          title: this.getTitle(el.licao),
          start: new Date(el.data),
          allDay: false,
          className: this.className(el.estado),
        };
        return event;
      });
    },
    className(estado) {
      if (!estado) return "event-default";
      switch (estado.estadoCode) {
        case 1:
          return "event-green";
        case 2:
          return "event-azure";
        case 3:
          return "event-orange";
        case 4:
          return "event-rose";
        default:
          return "event-default";
      }
    },
    getTitle(licao) {
      let title = "";
      if (!licao) return title;
      // title = licao.nome;
      if (licao.formacao_detalhe) title = licao.formacao_detalhe.nome;
      if (licao.categoria) title += `-${licao.categoria.categoria}`;
      return title;
    },
  },
  mounted() {
    this.setEvents(this.marcacoes);
  },
  watch: {
    marcacoes(value) {
      this.setEvents(value);
    },
  },
};
</script>
<style lang="scss" scoped>
#fullCalendar {
  min-height: 300px;
}

.md-card-calendar {
  .md-card-content {
    padding: 0 !important;
  }
}

.text-center {
  text-align: center;
}
</style>
