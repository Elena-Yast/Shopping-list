import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let shoppingList = ['Apples', 'Bananas', 'Milk'];


app.get("/", (req, res) => {
    res.render('shoppingList', { items: shoppingList });
});
  // Route for adding a new item to the shopping list
app.post('/addItem', (req, res) => {
    const newItem = req.body.item;
    shoppingList.push(newItem);
    res.json({ success: true, newItem });
});

// Route for  editing an item in the shopping list
app.get('/editItem/:originalItem/:editedItem', (req, res) => {
    const originalItem = req.params.originalItem;
    const editedItem = req.params.editedItem;

    const index = shoppingList.indexOf(originalItem);
    if (index !== -1) {
        shoppingList[index] = editedItem;
        res.json({ success: true, itemEdited: editedItem });
    } else {
        res.json({ success: false, message: 'Item not found for editing.' });
    }
});

//  Route for  deleting an item from the shopping list
app.get('/deleteItem/:item', (req, res) => {
    const itemToDelete = req.params.item;
    shoppingList = shoppingList.filter(item => item !== itemToDelete);
    res.json({ success: true, itemDeleted: itemToDelete });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
