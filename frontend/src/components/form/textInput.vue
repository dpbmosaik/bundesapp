<template>
    <div>
        <label type="textInput"> {{inputText}}
            <input for="textInput" type="text">
        </label>
    </div>
</template>

<script>
export default {
    name: "inputText",
    props: {
        "inputText": String,
    }
};
</script>