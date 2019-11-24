/**
 * @class AD300-5204
 * @quarter Fall 2019
 * @author Jeremiah Snow
 * @desc Rewrite of the ArrayList method.
 */
import java.util.NoSuchElementException;

public class ArrayIntList {
    // Data fields
    private int[] elementData;
    private int size;
    // Declare class constant
    public static final int DEFAULT_CAPACITY = 100;
    
    // Constructor
    public ArrayIntList(){
        this(DEFAULT_CAPACITY);
    }
    
    // Pre: capacity >=0
    public ArrayIntList(int capacity){
        elementData = new int[capacity];
        size = 0;
    }
    
    // Return the size of the arrayintlist
    public int size(){
            return size;
    }
    
    // Pre: 0 <= index < size
    public int get(int index){
        return elementData[index];
    }
    
    // Return occurences of a value
    public int count(int value){
        int count = 0;
        for(int i = 0; i < size; i++){
            if(elementData[i] == value)
                count++;
        }
        return count;
    }
    
    // Returns the first index of a value
    public int indexOf(int value){
        for(int i = 0; i < size; i++){
            if(elementData[i] == value)
                return i;
        }
        return -1;
    }
    
    // Returns the last index of a value
    public int lastIndexOf(int value){
            for(int i = size; i > 0; i--){
                if(elementData[i] == value)
                    return i;
            }
            return -1;
    }
    
    // Add method: Add to the end of the list
    // Pre:  size < capacity
    public void add(int value){
        elementData[size] = value;
        size++;
    }
    
    // Pre: size < capacity && 0 <= index <= size
    // Add at index method: Add to specified area
    public void add(int value, int index){
        size++;
        for(int i = size; i > index; i--)
            elementData[i] = elementData[i -1];
        elementData[index] = value;
    }
    
    // Pre: 0 <= index < size
    // Remove method: Remove int at index
    public void remove(int index){
        for(int i = index; i < size - 1; i++){
            elementData[size] = elementData[size + 1];
        }
        size--;
    }
    
    // Remove the last value of the array
    public int removeLast() throws NoSuchElementException {
        int last = elementData[size - 1];
        size--;
        return last;
    }
    
    // Copy and append the list to itself
    public void doubleList(){
        size *= 2;
        for(int i = 0; i < size / 2; i++)
            elementData[size / 2 + i] = elementData[i];
    }
        
    // toString method: Returns the value as a string
    public String toString(){
        if(size == 0)
            return "[]";
        else{
            String result = "[" + elementData[0];
            for(int i = 1; i < size; i++)
                result += ", " + elementData[i];
            return result + "]";
        }        
    }
    
}
   