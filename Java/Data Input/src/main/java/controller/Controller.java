/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import gui.FormEvent;
import java.io.File;
import java.io.IOException;
import java.util.List;
import model.AgeCategory;
import model.Database;
import model.EmploymentCategory;
import model.Gender;
import model.Person;

/**
 *
 * @author jerm
 */
public class Controller {
    Database db = new Database();
    
    public List<Person> getPeople(){
        return db.getPeople();
    }

    public void removePerson(final int index) {
        db.removePerson(index);
    }

    public void addPerson(final FormEvent ev) {
        final String name = ev.getName();
        final String occupation = ev.getOccupation();
        final int ageCatId = ev.getAgeCategory();
        final String empCatId = ev.getEmploymentCategory();
        final boolean isUs = ev.isUsCitizen();
        final String taxId = ev.getTaxId();
        final String gender = ev.getGender();

        AgeCategory ageCategory = null;

        switch (ageCatId) {
        case 0:
            ageCategory = AgeCategory.child;
            break;
        case 1:
            ageCategory = AgeCategory.adult;
            break;
        case 2:
            ageCategory = AgeCategory.senior;
            break;
        }

        EmploymentCategory empCategory;

        switch (empCatId) {
        case "employed":
            empCategory = EmploymentCategory.employed;
            break;
        case "self-employed":
            empCategory = EmploymentCategory.selfEmployed;
            break;
        case "unemployed":
            empCategory = EmploymentCategory.unemployed;
            break;
        default:
            empCategory = EmploymentCategory.other;
            System.err.println(empCatId);
            break;
        }

        Gender genderCat;

        if (gender.equals("male")) {
            genderCat = Gender.male;
        } else {
            genderCat = Gender.female;
        }

        final Person person = new Person(name, occupation, ageCategory, empCategory, taxId, isUs, genderCat);

        db.addPerson(person);
    }

    public void saveToFile(final File file) throws IOException {
        db.saveToFile(file);
    }

    public void loadFromFile(final File file) throws IOException {
        db.loadFromFile(file);
    }
}
