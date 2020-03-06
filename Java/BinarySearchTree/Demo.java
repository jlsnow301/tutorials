package com.mycompany.binarysearchtree;

/**
 * @class AD325-5207
 * @quarter Winter 2020
 * @author Jeremiah Snow
 * @desc A binary search tree.
 */
public class Demo {
    // Main method creates two arrays and demos the intsearchtree
    public static void main(String[] args) {
        // Create the lists
        int[] list = {55,29,87,-3,42,60,91};
        int[] list1 = {60,55,100,45,57};
        
        display(list);
        display(list1);        
    }
    
    // Displays the array once added
    public static void display(int[] list){
        // Create the tree        
        IntSearchTree tree = new IntSearchTree();
        // Preformatting
        System.out.println("The original array is:");
        // Add to lists and print
        for(int i : list){
            System.out.print(i + " ");
            tree.add(i);
        }
        System.out.println("\nTree structure:\n");
        tree.printSideways();
        System.out.println("\nSorted list:");
        tree.print();
        // Printouts for the countleftnode and isfull methods
        System.out.println("The number of left nodes is: " 
                + tree.countLeftNodes());
        System.out.println("This is a full binary tree: "
                + tree.isFull());
        System.out.println("\n");
    } // End display
}
