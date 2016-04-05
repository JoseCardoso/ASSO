package framework;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.border.Border;

public class SimpleDraw {

	JTextArea textArea;
	JButton pluginLoadButton;
	JPanel pluginLoader;
	DrawArea drawArea;
	JFrame frame;
	JPanel pluginBar;
	Container content;

	public static void main(String[] args) {
		new SimpleDraw().show();
	}

	public void show() {
		// create main frame
		frame = new JFrame("Swing Paint");
		content = frame.getContentPane();
		// set layout on content pane
		content.setLayout(new BorderLayout());

		drawArea = new DrawArea();
		drawArea.setName("drawArea");
		content.add(drawArea, BorderLayout.CENTER);

		pluginLoader = new JPanel();
		textArea = new JTextArea("Plugin name", 1, 40);
		textArea.addFocusListener(new FocusListener() {
			@Override
			public void focusLost(FocusEvent e) {
			}

			@Override
			public void focusGained(FocusEvent e) {
				((JTextArea) e.getSource()).setText("");
			}
		});
		textArea.addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
			}

			@Override
			public void keyReleased(KeyEvent e) {
			}

			@Override
			public void keyPressed(KeyEvent e) {

				if (e.getKeyCode() == KeyEvent.VK_ENTER) {
					pluginLoadButton.doClick();
					e.consume();
				}

			}
		});
		Border border = BorderFactory.createLineBorder(Color.BLACK);
		textArea.setBorder(BorderFactory.createCompoundBorder(border, BorderFactory.createEmptyBorder(5, 10, 5, 10)));
		pluginLoadButton = new JButton("Load");
		pluginLoadButton.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				try {
					Class pluginClass = Class.forName("plugins." + textArea.getText());
					Plugin plugin = (Plugin) pluginClass.newInstance();
					System.out.println(plugin.getName());
					textArea.add(new JButton(plugin.getName()));
				} catch (ClassNotFoundException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (InstantiationException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (IllegalAccessException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				textArea.setText("Plugin name");

				((JButton) e.getSource()).getParent().getParent().revalidate();
			};
		});
		pluginLoader.add(textArea);
		pluginLoader.add(pluginLoadButton);

		content.add(pluginLoader, BorderLayout.NORTH);

		pluginBar = new JPanel();
		pluginBar.setLayout(new BorderLayout());
		content.add(pluginBar, BorderLayout.SOUTH);

		frame.setSize(600, 600);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
		frame.setResizable(false);
		frame.toFront();
		frame.requestFocus();
	}

}