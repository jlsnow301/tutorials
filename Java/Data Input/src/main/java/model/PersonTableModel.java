/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.List;
import javax.swing.table.AbstractTableModel;

/**
 *
 * @author jerm
 */
public class PersonTableModel extends AbstractTableModel {
    
    /**
     *
     */
    private static final long serialVersionUID = -3203842537799965021L;

    private List<Person> db;
    
    private final String[] colNames = { "ID", "Name", "Occupation", 
        "Age Category", "Employment Category", "US Citizen", "Tax ID" };

    public PersonTableModel() {
    }

    @Override
    public String getColumnName(final int column) {
        return colNames[column];
    }

    public void setData(final List<Person> db) {
        this.db = db;
    }

    @Override
    public int getRowCount() {
        return db.size();
    }

    @Override
    public int getColumnCount() {
        return 7;
    }

    @Override
    public Object getValueAt(final int row, final int col) {
        final Person person = db.get(row);
        
        switch(col){
            case 0:
                return person.getId();
            case 1:
                return person.getName();
            case 2:
                return person.getOccupation();
            case 3:
                return person.getAgeCategory();
            case 4:
                return person.getEmpCategory();
            case 5:
                return person.isUsCitizen();
            case 6:
                return person.getTaxId();
        }
        return null;
    }
}
