<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../../stores/stores";

  onMount(() => {
    window.parent.postMessage(
      {
        type: "getUserName",
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      const { type, data } = event.data;

      if (type === "devvit-message") {
        const { message } = data;

        switch (message.type) {
          case "initialData": {
            const { username } = message.data;
            user.set(username);
            // console.log(username);
            // console.log(top);
            break;
          }
        }
      }
    });
  });
</script>

<div class="fixed bottom-2 left-2 select-none text-white">
  <div class="flex justify-between place-items-center space-x-4">
    <span class="mountains-of-christmas-bold">{$user}</span>
    <img class="h-8 w-8" src="/wasd.svg" alt="" />
    <span class="mountains-of-christmas-bold">hold down click to move camera</span>
  </div>
</div>
