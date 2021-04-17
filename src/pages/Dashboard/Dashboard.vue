<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <i class="fab fa-twitter"></i>
          </div>
          <p class="category">Folowers</p>
          <h3 class="title">
            +<animated-number :value="245"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>update</md-icon>
            Just Updated
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="rose">
        <template slot="header">
          <div class="card-icon">
            <md-icon>equalizer</md-icon>
          </div>
          <p class="category">Website Visits</p>
          <h3 class="title">
            <animated-number :value="75"></animated-number>.<animated-number
              :value="521"
            ></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>local_offer</md-icon>
            Tracked from Google Analytics
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>store</md-icon>
          </div>
          <p class="category">Revenue</p>
          <h3 class="title">
            $ <animated-number :value="34"></animated-number>,<animated-number
              :value="245"
            ></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>date_range</md-icon>
            Last <animated-number :value="24"></animated-number> Hours
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>weekend</md-icon>
          </div>
          <p class="category">Bookings</p>
          <h3 class="title">
            <animated-number :value="184"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon class="text-danger">warning</md-icon>
            <a href="#pablo">Get More Space...</a>
          </div>
        </template>
      </stats-card>
    </div>
  </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
import {
  StatsCard,
  ChartCard,
  ProductCard,
  AnimatedNumber,
  GlobalSalesCard,
  GlobalSalesTable
} from "@/components";

export default {
  components: {
    StatsCard,
    AnimatedNumber,
  },
  data() {
    return {};
  }
};
</script>
