
var state = {
  items: []
};

const addItem = item => {
    return state.items.unshift({
        itemName: item,
        itemChecked: false
    });

};

const deleteItem = itemToBeDeleted => {
    state.items = state.items.filter(item => {
        return itemToBeDeleted !== item.itemName
   });
};
// state.items.splice(itemToBeDeleted, 1);
// }

const updateItem = (item) => {
    state.items = state.items.map(element => {
        return element.itemName === item ? {itemName: element.itemName, itemChecked: !(element.itemChecked)} : element;
    });
    return state.items
 };


const getExistingItemsFromStaticHtml = () => {
   var map =  $(".shopping-item").get().map((element, index) => {
        return {
            itemName: $(element).html(),
            itemChecked: $(element).hasClass("shopping-item__checked")
        };
    });
    return map;
}

const setInitialState = () => {
    var items = getExistingItemsFromStaticHtml();
    state = {
        items: items
    };
};


const renderList = element => {
    var itemsHtml = state.items.map((item, index) => {
        var newClass = item.itemChecked ? "shopping-item__checked" : null;
        return  `<li><span class="shopping-item ${newClass}" data-number="${index}">${item.itemName}</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>`
    });
      element.html(itemsHtml);
}

const eventListenerAddItem = () => {
    $("#js-shopping-list-form").submit( event => {
        event.preventDefault();
        addItem($("#shopping-list-entry").val());
        renderList($(".shopping-list"));
        $("#shopping-list-entry").val("");
    });
};

const eventListenerDeleteItem = () => {
    $(".shopping-list").on("click", ".shopping-item-delete", event => {
        // var itemToDelete = ($(event.target).closest("li").find(".shopping-item").attr("data-number"));
        var itemToDelete = ($(event.target).closest("li").find(".shopping-item").text());
        console.log(itemToDelete)
        deleteItem(itemToDelete);
        renderList($(".shopping-list"));
     });
};

const eventListenerCheck = () => {
    $(".shopping-list").on("click", ".shopping-item-toggle", event => {
            var itemToUpdate = $(event.target).closest("li").find(".shopping-item").text();
            updateItem(itemToUpdate);
            renderList($(".shopping-list"))
     });
}



const init = () => {
 eventListenerAddItem();
 eventListenerDeleteItem();
 eventListenerCheck();
 setInitialState();
}

$(init)
