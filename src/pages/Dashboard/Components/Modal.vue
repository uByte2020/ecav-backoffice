<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Nova Marcação
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <form action="">
            <div class="form-group">
              <input type="text" 
                name="Formador" 
                id="Formador" 
                placeholder="Formador" 
                onfocus="this.placeholder = ''" 
                onblur="this.placeholder = 'Formador'" class="form-controll">
            </div>
            <div class="form-group">
              <input type="text" 
                name="Formação" 
                id="Formação" 
                placeholder="Formação" 
                onfocus="this.placeholder = ''" 
                onblur="this.placeholder = 'Formação'" class="form-controll">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Categoria" 
                onfocus="this.placeholder = ''" 
                onblur="this.placeholder = 'Categoria'" class="form-controll">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Lição" 
                onfocus="this.placeholder = ''" 
                onblur="this.placeholder = 'Lição'" class="form-controll">
            </div>
            <div class="form-time">
              <input type="date" class="data">
              <input type="time">
            </div>
          </form>
        </section>

        <footer class="modal-footer">
          <button
            class="btn-left">
            Criar Marcação
          </button>
          <button
            type="button"
            class="btn-right"
            @click="close"
            aria-label="Close modal"
          >
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import marcacaoformador from "../Tables/marcacaoformador";
  export default {
    name: 'Modal',
    data(){
      return{
        formador:marcacaoformador
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>
<style>
  .modal-backdrop {
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1 !important;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    position: absolute;
    z-index: 1;
    flex-direction: column;
    width: 700px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer, .form-time {
    border-top: 1px solid #eeeeee;
    flex-direction: row;
    display: flex !important;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 28px;
    padding: 10px;
    cursor: pointer;
    color: #000;
    background: transparent;
  }
  .data{
    margin-right: 1%;
    float: left !important;
  }
  .btn-left {
    width: 50%;
    color: white;
    background: green;
    border: 1px solid green;
    border-radius: 2px;
    height: 30px;
    margin-right: 1%;
    float: left !important;
    cursor: pointer;
  }
  .btn-right {
    width: 50%;
    color: white;
    background: green;
    border: 1px solid green;
    border-radius: 2px;
    height: 30px;
    float: right !important;
    cursor: pointer;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
    .form-group, .form-controll{
      margin: 10px auto;
    }
  .form-controll{
    width: 100%;
    position: relative;
    font-size: 16px;
    color: #5b5b5b;
    border: 1px green solid ;
    padding: 10px 10px 10px 0px;
    box-sizing: content-box;
    z-index: 2;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .form-group{
    position: relative;
    margin: 1%;
  }
  .form-controll:focus + .label-nome
{
	margin-top: 0px;
	top: -50%;
	z-index: 2;
	transition: 0.2s;    
}

.form-controll:focus
{
  border-bottom-width : 2px;  
  outline: none;
}
  .label-nome
  {
    width: 100%;
    position: absolute;
    color: Goldenrod;  
    top: 0; bottom: 0; left: 0; right: 0;
    transition: 0.3s;                
  }
</style>