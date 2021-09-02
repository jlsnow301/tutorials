/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import javax.swing.*;
import java.awt.*;

/**
 *
 * @author jerm
 */
public class TextPanel extends JPanel {
    
    /**
     *
     */
    private static final long serialVersionUID = -4740155469336282946L;
    private final JTextArea textArea;

    public TextPanel() {
        textArea = new JTextArea();

        setLayout(new BorderLayout());

        add(new JScrollPane(textArea), BorderLayout.CENTER);

    }

    public void appendText(final String text) {
        textArea.append(text);
    }
    
}
