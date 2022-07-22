<script lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { FeedbackStore } from "../stores";
  import Button from "./common/Button.svelte";
  import Card from "./common/Card.svelte";
  import RatingSelect from "./RatingSelect.svelte";

  let text = "";
  let buttonDisabled = true;
  let message = "";
  let rating = 10;
  const min = 10;

  const handleInput = () => {
    if (text.trim().length <= min) {
      message = `Please enter at least ${min} characters`;
      buttonDisabled = true;
      return true;
    }
    message = null;
    buttonDisabled = false;
  };
  const handleSelect = (e) => {
    rating = e.detail;
  };
  const handleSubmit = (e) => {
    if (text.trim().length <= min || buttonDisabled) {
      return false;
    }
    const newFeedback = {
      id: uuidv4(),
      text,
      rating: +rating,
    };
    FeedbackStore.update((current) => [...current, newFeedback]);
    text = "";
  };
</script>

<Card>
  <header>
    <h2>How would you rate our service?</h2>
  </header>
  <form on:submit|preventDefault={handleSubmit}>
    <RatingSelect on:rating-select={handleSelect} />
    <div class="input-group">
      <input
        bind:value={text}
        on:input={handleInput}
        placeholder="Tell us your thoughts"
        type="text"
      />
      <Button disabled={buttonDisabled} type="submit">Send</Button>
    </div>
    {#if message}
      <div class="message">
        {message}
      </div>
    {/if}
  </form>
</Card>

<style>
  header {
    max-width: 400px;
    margin: auto;
  }

  header h2 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }

  .input-group {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    padding: 8px 10px;
    border-radius: 8px;
    margin-top: 15px;
  }

  input {
    flex-grow: 2;
    border: none;
    font-size: 16px;
  }

  input:focus {
    outline: none;
  }

  .message {
    padding-top: 10px;
    text-align: center;
    color: rebeccapurple;
  }
</style>
