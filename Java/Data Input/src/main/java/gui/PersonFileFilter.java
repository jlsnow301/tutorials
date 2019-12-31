/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;
import java.io.File;
import javax.swing.filechooser.FileFilter;

/**
 *
 * @author jerm
 */
public class PersonFileFilter extends FileFilter {

    @Override
    public boolean accept(File file) {
        
        String name = file.getName();
        
        String extension = Utils.getFileExtension(name);
        
        if(extension == null){
            return false;
        }
        
        if(extension.equals("per")){
            return true;
        }
        
        return false;
    }

    @Override
    public String getDescription() {
        return "Person database files (*.per)";
    }
    
}
