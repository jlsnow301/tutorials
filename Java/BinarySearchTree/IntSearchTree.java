package com.mycompany.binarysearchtree;

/**
 * @class AD325-5207
 * @quarter Winter 2020
 * @author Jeremiah Snow
 * @desc A binary search tree.
 */
public class IntSearchTree {
    private IntTreeNode overallRoot;
    
    // Construct empty tree
    public IntSearchTree(){
        overallRoot = null;
    } // End IntSearchTree
    
    // Add method
    public void add(int value){
        overallRoot = add(overallRoot, value);
    } // End add
    
    // Add method helper
    private IntTreeNode add(IntTreeNode root, int value){
        // Create tree if there isn't any
        if(root == null){
            root = new IntTreeNode(value);
        } else if(value < root.data){
            root.left = add(root.left, value);
        } else if(value > root.data){
            root.right = add(root.right, value);
        }
        
        return root;        
    } // End private add
    
    // Search for a value
    public boolean contains(int value){
       return contains(overallRoot, value);
    }
    
    // Contains helper
    public boolean contains(IntTreeNode root, int value){
        if(root == null){
            return false;
        } else if(value == root.data){
            return true;
        } else if(value < root.data){
            return contains(root.left, value);
        } else {
            return contains(root.right, value);
        }
    } // End contains
    
    // Public method for counting left nodes
    public int countLeftNodes(){
        return countLeftNodes(overallRoot);
    }
    // Count left nodes
    private int countLeftNodes(IntTreeNode root){
        int count = 0;
        if(root != null){
            if(root.left != null){
                count++;
            }
            count += countLeftNodes(root.left);
            count += countLeftNodes(root.right);
        }
        return count;
    } // End countLeftNodes
    
    // Public method to detect full trees
    public boolean isFull(){
        return isFull(overallRoot);
    }
    
    // Private helper
    // If any tree is uneven, return false
    private boolean isFull(IntTreeNode root){
        boolean isLeftEven = true, isRightEven = true;
        if(root != null){
            // If both nodes are full
            if(root.left != null && root.right != null){
                isLeftEven = isFull(root.left);
                isRightEven = isFull(root.right);
            // If neither nodes are full
            } else if(root.left == null && root.right == null){
                return true;
            // If one is full
            } else {
                return false;
            }
        }
        return isLeftEven == isRightEven;
    } // End isFull
    
    // Display the tree
    public void print(){
        printInOrder(overallRoot);
        System.out.println();
    } // End Print
    
    // Display in order
    private void printInOrder(IntTreeNode root){
        if(root != null){
            printInOrder(root.left);
            System.out.print(root.data + " ");
            printInOrder(root.right);
        }
    } // End printInOrder
    
    // Display sideways
    public void printSideways(){
        printSideways(overallRoot, "");
    } // End printSideways
    
    // Print the tree in another format
    private void printSideways(IntTreeNode root, String indent){
        if(root != null){
            printSideways(root.right, indent + "    ");
            System.out.println(indent + root.data);
            printSideways(root.left, indent + "    ");
        }
    } // End printSideways
    
}
