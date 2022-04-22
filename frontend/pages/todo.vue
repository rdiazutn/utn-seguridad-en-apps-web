<template>
  <v-row justify="center" align="center" class="h-100">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card>
        <v-card-title class="px-8">
          Escriba aquí el to-do a agregar
        </v-card-title>
        <v-card-text>
          <div class="px-4">
            <v-form ref="form" class="d-flex align-center" @submit.prevent="addToDo">
              <v-text-field
                v-model="newTodo"
                label="To-do"
                placeholder="Ingrese su TO-DO"
                :rules="[v => !!v || 'Por favor ingrese su to-do']"
              >
                <template #append>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" type="submit" v-on="on">
                        <v-icon color="primary">
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </template>
                    <template #default>
                      Agregar
                    </template>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-form>
          </div>
          <div class="mt-2">
            <v-list>
              <transition-group name="list" mode="out-in" tag="div">
                <div v-for="(todo, index) in todos" :key="index">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ todo.text }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                          <v-btn icon v-bind="attrs" @click="removeToDo(index)" v-on="on">
                            <v-icon color="info">
                              mdi-check
                            </v-icon>
                          </v-btn>
                        </template>
                        <template #default>
                          Marcar como completado
                        </template>
                      </v-tooltip>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider v-if="index !== todos.length - 1" />
                </div>
              </transition-group>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    newTodo: '',
    valid: true,
    todos: [{
      id: 1,
      text: 'Hacer el curso de Vue.js'
    },
    {
      id: 2,
      text: 'Hacer el curso de Laravel'
    },
    {
      id: 3,
      text: 'Hacer el curso de React'
    }]
  }),
  methods: {
    removeToDo (idx) {
      this.todos.splice(idx, 1)
      this.$refs.form.resetValidation()
    },
    addToDo () {
      this.valid = this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      this.todos.push({
        id: this.todos.length + 1,
        text: this.newTodo
      })
      this.newTodo = ''
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style>
.list-leave-active {
  position: absolute;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0.4;
  float: right;
  transform: translateX(50%);
}
</style>
