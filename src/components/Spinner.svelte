<div class="balls">
  <div class="ball">
    <div class="bone" />
  </div>
  <div class="ball">
    <div class="bone" />
  </div>
  <div class="ball">
    <div class="bone" />
  </div>
</div>

<style>
  .balls {
    /* width: 3.5em; */
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 1em;
  }
  .balls .ball {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: #fc2f70;
    transform: translateY(-100%);
    animation: wave 0.8s ease-in-out alternate infinite;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .balls .ball .bone {
    width: 0.17em;
    height: 0.17em;
    border-radius: 50%;
    background-color: #fff;
  }
  .balls div:nth-of-type(1) {
    animation-delay: -0.4s;
  }
  .balls div:nth-of-type(2) {
    animation-delay: -0.2s;
  }
  @keyframes wave {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(100%);
    }
  }
</style>