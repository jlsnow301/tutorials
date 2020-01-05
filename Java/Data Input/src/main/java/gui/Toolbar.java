/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;


/**
 *
 * @author jerm
 */
public class Toolbar extends JPanel implements ActionListener {
    /**
     *
     */
    private static final long serialVersionUID = 454505914357471120L;
    private final JButton firstButton;
    private final JButton secondButton;

    private StringListener textListener;

    public Toolbar() {
        setBorder(BorderFactory.createEtchedBorder());
        firstButton = new JButton("Button1");
        secondButton = new JButton("Button2");

        firstButton.addActionListener(this);
        secondButton.addActionListener(this);

        setLayout(new FlowLayout(FlowLayout.LEFT));

        add(firstButton);
        add(secondButton);
    }

    public void setStringListener(final StringListener listener) {
        this.textListener = listener;
    }

    @Override
    public void actionPerformed(final ActionEvent e) {
        final JButton clicked = (JButton) e.getSource();
        
        if(clicked == firstButton && textListener != null)
            textListener.textDisplay("Hello\n");
        else if(clicked == secondButton && textListener != null)
            textListener.textDisplay("Goodbye\n");
    }
}
