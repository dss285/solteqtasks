<script lang="ts">
import { defineComponent } from "vue";
interface EnergyEntryTimeSpan {
  fromTimestamp: Date;
  toTimestamp: Date;
  locationName: string;
  reportingGroup: string[];
  value: number;
  unit: string;
}
export default defineComponent({
  data() {
    return {
      keys: [
        "From",
        "To",
        "Location Name",
        "Reporting Group",
        "Value",
        "Unit",
      ] as string[],
      entries: [] as EnergyEntryTimeSpan[],
    };
  },
  async created() {
    await this.fetchFromApi();
  },
  methods: {
    async fetchFromApi() {
      var tmp = await fetch("https://localhost:7274/EnergiaKulutus");
      if (tmp.status === 200) {
        this.entries = await tmp.json();
      }
      return [];
    },
  },
});
</script>

<template>
  <table>
    <tr>
      <th v-for="key in keys" :key="key">{{ key }}</th>
    </tr>
    <tr v-for="entry in entries" :key="entry.toTimestamp.getMilliseconds">
      <td>{{ entry.fromTimestamp }}</td>
      <td>{{ entry.toTimestamp }}</td>
      <td>{{ entry.locationName }}</td>
      <td>{{ entry.reportingGroup }}</td>
      <td>{{ entry.value }}</td>
      <td>{{ entry.unit }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
