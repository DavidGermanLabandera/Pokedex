<template>
  <div>
    <v-text-field  :label="labelSearch"/>
  </div>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
      default: ''
    },
    labelSearch: {
      type: String,
      default: '',
    }
  }
}
</script>