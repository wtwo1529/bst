import BST from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let bst = new BST(arr);
// bst.insert(100);
// prettyPrint(bst.root);
// console.log(bst.depth(bst.root.right.right));
// console.log(bst.height(bst.root.left.left));

// bst.levelOrder((n) => {
//   return n;
// });
// console.log("");
// bst.inOrder((n) => {
//   return n;
// });
// console.log("");

// bst.preOrder((n) => {
//   return n;
// });
// console.log("");
// bst.postOrder((n) => {
//   return n;
// });

// bst.reBalance();
let bst = new BST();
bst.insert(1);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(5);
bst.insert(6);
prettyPrint(bst.root);
console.log(bst.isBalanced());
bst.reBalance();
prettyPrint(bst.root);
console.log(bst.isBalanced());
