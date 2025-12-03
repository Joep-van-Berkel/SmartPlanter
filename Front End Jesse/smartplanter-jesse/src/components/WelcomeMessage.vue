<template>

    <div class="welcomeMessage">
        <h1>Hallo,</h1><span>Jesse de Poot</span>
    </div>

</template>

<style>

    
  .welcomeMessage {
    display: flex;
    margin: 2rem 0 0.5rem 3rem;
    width: 50rem;
    height: 2.5rem;
    align-items: center;
}

  .welcomeMessage h1,
  .welcomeMessage span {
    font-size: 2.5rem;
    font-weight: 600;
    padding-right: 1rem;
    color: var(--text);
  }

  .welcomeMessage span {
    color: var(--primary);
  }

</style>