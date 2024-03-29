<script setup>
import { ref } from "vue";
import AppIcon from "@/components/AppIcon.vue";
import Player from "@/components/Player.vue";

components: {
  AppIcon;
}

const mainPlayer = ref(false);
</script>

<template>
  <nav class="control">
    <div class="control-panel">
      <section class="main-section">
        <div class="first-block">
          <AppIcon name="user" type="button" />
          <AppIcon name="home" type="button" />
          <AppIcon name="films" type="button" />
          <AppIcon name="food" type="button" />
        </div>
        <!-- <Transition name="blur" mode="out-in"> -->
        <div class="center-block" v-if="!mainPlayer">
          <Player v-if="!mainPlayer" type="info" v-model:mainPlayer="mainPlayer" />
          <!-- <Player v-else class="main-player" v-model:mainPlayer="mainPlayer" /> -->
        </div>
        <!-- </Transition> -->
        <div class="third-block">
          <AppIcon name="cart" type="button" />
        </div>
      </section>
      <section class="second-section">
        <!-- <Transition name="blur" mode="out-in"> -->
        <Player v-if="mainPlayer" class="main-player" v-model:mainPlayer="mainPlayer" />
        <!-- </Transition> -->
      </section>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
.control
  position: fixed
  bottom: $offset-3xs
  display: flex
  justify-content: center
  width: 100%
  // margin-bottom: $offset-3xs
.control-panel
  @include background(blur, 80)
  display: flex
  align-items: center
  width: $container-width
  @include mq(xs)
    width: 100%

  .main-section
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    gap: $offset-2xs $offset-xs
    padding: $offset-3xs $offset-xs
    width: 100%

    div
      display: flex
      align-items: center
      flex: 0 1 auto
      gap: 0 $offset-3xs
    .first-block
      min-height: 48px
      @include mq(s)
        order: 2
    .center-block
      flex: 1 0 max-content
      @include mq(s)
        flex: 1 1 100%
      .main-player
        position: absolute
        left: 0px
        bottom: calc(100% + $offset-3xs)
        display: flex
        width: 100%
    .third-block
      @include mq(s)
        order: 3

  .second-section
    position: absolute
    bottom: calc(100% + $offset-3xs)
    display: flex
    width: 100%
</style>
