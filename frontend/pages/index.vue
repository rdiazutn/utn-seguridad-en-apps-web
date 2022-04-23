<template>
  <v-row justify="center" align="center" class="h-100">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-form ref="form" @submit.prevent="login">
        <v-card>
          <v-card-title class="justify-center">
            Ingreso a HackMePlease
          </v-card-title>
          <div class="mb-4 d-flex justify-center">
            <v-progress-circular v-if="loading" indeterminate color="primary" />
            <v-icon v-else :color="valid ? 'primary' : 'error'" large>
              mdi-lock
            </v-icon>
          </div>
          <v-card-text class="mb-4">
            <div>
              Bienvenido a HackMePlease el mejor sistema de TODO's. Totalmente seguro y libre de vulnerabiliadades <strong>?</strong>.
            </div>
            <div class="my-2">
              <v-text-field
                v-model="form.username"
                placeholder="Ingrese su usuario aquí"
                label="Usuario"
                :rules="[v => !!v || 'Por favor ingrese su usuario']"
              />
            </div>
            <div class="my-2">
              <v-text-field
                v-model="form.password"
                :type="showPassword ? 'showPassword' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                placeholder="Ingrese contraseña aquí"
                label="Contraseña"
                :rules="[v => !!v || 'Por favor ingrese su contraseña']"
                @click:append="showPassword = !showPassword"
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" type="submit" block>
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'login',
  data: () => ({
    form: {
      username: '',
      password: ''
    },
    valid: true,
    loading: false,
    showPassword: false
  }),
  methods: {
    login () {
      this.valid = this.$refs.form.validate()
      if (!this.valid) {
        return
      }
      this.loading = true
      this.$axios.$post('/api/login', {
        username: this.form.username,
        password: this.form.password
      }).then(() => {
        this.$router.push('/todo')
      }).catch(() => {
        this.valid = false
      }).finally(() => { this.loading = false })
    }
  }
}
</script>
