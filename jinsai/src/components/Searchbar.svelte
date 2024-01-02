<script>



    let searchText = ''; // 用户的输入
    export let items = ['apple', 'banana', 'orange', 'grape']; // 搜索列表
    let showMessage = false; // 控制提示消息的显示
    let inList = false; // 输入是否在列表中
    export let title = 'Search'; // 页面标题
    let showModal = false; // 控制模态框的显示
    // 搜索处理函数
    function handleSearch() {
        inList = items.includes(searchText.toLowerCase());
        showAlert(inList)
    }
    function showAlert(inList) {
        if (inList) {
            alert(`${searchText} is in the list!`)
        } else {
            alert(`${searchText} is not in the list!`)
        }
    }

</script>

<style>
    /* 设置整体布局样式 */

    .container {
        width: 100%; /* 宽度为100% */
        padding-top: 10px;
    }
    .title {
        margin: 0;
        font-size: 16px;
    }
    .search-box {
        padding: 8px;
    }

    input {
        padding: 8px;
        margin-right: 4px;
        width: 200px;
        color: black;
    }

    button {
        padding: 8px 16px;
    }

    .alert {
        color: red;
    }
</style>

<div class="container">
    <div class="title">{title}</div>
    <input
            type="text"
            placeholder="Search here..."
            bind:value={searchText}
    />

    <button type="button" class="btn variant-filled" on:click={handleSearch}>Search</button> <!-- 搜索按钮 -->

    <!-- 根据showMessage和inList变量显示不同的提示 -->

</div>
