<template v-slot:item.edad="{ item }">
    <v-chip :color="getColor(item.edad)" dark>{{ item.edad }}</v-chip>
</template> 