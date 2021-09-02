/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import java.util.EventObject;

/**
 *
 * @author jerm
 */
public class FormEvent extends EventObject {
    
    /**
     *
     */
    private static final long serialVersionUID = -4315440931973531160L;
    private String name;
    private String occupation;
    private int ageCategory;
    private String empCategory;
    private String taxId;
    private boolean usCitizen;
    private String gender;
    
    public FormEvent(final Object source) {
        super(source);
    }

    public FormEvent(final Object source, final String name, final String occupation, final int ageCat,
            final String empCat, final String taxId, final boolean usCitizen, final String gender) {
        super(source);

        this.name = name;
        this.occupation = occupation;
        this.ageCategory = ageCat;
        this.empCategory = empCat;
        this.taxId = taxId;
        this.usCitizen = usCitizen;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(final String occupation) {
        this.occupation = occupation;
    }
    
    public int getAgeCategory(){
        return ageCategory;
    }
    
    public String getEmploymentCategory(){
        return empCategory;
    }

    public String getTaxId() {
        return taxId;
    }
    
    public boolean isUsCitizen() {
        return usCitizen;
    }

    public String getGender() {
        return gender;
    }
    
}
