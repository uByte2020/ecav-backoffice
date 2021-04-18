<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>assignment</md-icon>
          </div>
          <h4 class="title">Simple Table</h4>
        </md-card-header>
        <md-card-content>
          <md-table v-model="tableData">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="#">{{ item.id }}</md-table-cell>
              <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
              <md-table-cell md-label="Country">{{
                item.country
              }}</md-table-cell>
              <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
              <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
              <md-table-cell md-label="Actions" :class="getAlignClasses(item)">
                <md-button
                  class="md-just-icon"
                  :class="getClass(item.icon1, item.id)"
                  ><md-icon>{{ item.icon1 }}</md-icon></md-button
                >
                <md-button
                  class="md-just-icon"
                  :class="getClass(item.icon2, item.id)"
                  ><md-icon>{{ item.icon2 }}</md-icon></md-button
                >
                <md-button
                  class="md-just-icon"
                  :class="getClass(item.icon3, item.id)"
                  ><md-icon>{{ item.icon3 }}</md-icon></md-button
                >
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import marcacao from './marcacao'
export default {
  data() {
    return {
      tableData: marcacao,
    };
  },
  computed: {
    shoppingTotal() {
      return this.shoppingCartTable.reduce((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    }
  },
  methods: {
    getClass: function(item, id) {
      let classes = "";
      switch (item) {
        case "person": {
          classes = "md-info";
          break;
        }
        case "edit": {
          classes = "md-success";
          break;
        }
        case "close": {
          classes = "md-danger";
          break;
        }
      }
      switch (id) {
        case 1:
        case 5: {
          break;
        }
        case 2:
        case 4: {
          classes = `${classes} md-round`;
          break;
        }
        case 3: {
          classes = `${classes} md-simple`;
          break;
        }
      }
      return classes;
    },
    getAlignClasses: ({ id }) => ({
      "text-right": id
    }),
    increaseQuantity(item) {
      item.qty++;
      this.computeAmount(item);
    },
    decreaseQuantity(item) {
      if (item.qty > 1) {
        item.qty--;
        this.computeAmount(item);
      }
    },
    computeAmount(item) {
      item.amount = item.qty * item.price;
    }
  }
};
</script>
<style lang="scss" scoped>
.text-right .md-table-cell-container {
  display: flex;
  justify-content: flex-end;
}
.md-table .md-table-head:last-child {
  text-align: right;
}

.table-stats {
  display: flex;
  align-items: center;
  text-align: right;
  flex-flow: row wrap;

  .td-price .td-total {
    display: inline-flex;
    font-weight: 500;
    font-size: 1.0625rem;
    margin-right: 50px;
  }

  &.table-striped .td-price {
    border-bottom: 0;
  }

  .td-price {
    font-size: 26px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .td-price,
  > div {
    flex: 0 0 100%;
    padding: 12px 8px;
  }
}

.table-shopping .md-table-head:nth-child(5),
.table-shopping .md-table-head:nth-child(7),
.table-shopping .md-table-head:nth-child(6) {
  text-align: right;
}
</style>
