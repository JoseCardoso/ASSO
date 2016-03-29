/*
 * Created on Oct 26, 2004
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package plugins;

import javax.swing.JButton;

import framework.Plugin;

/**
 * @author aaguiar
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SimplePlugin extends Plugin {
	
	public SimplePlugin() {
		this.name = "SimplePlugin";
		JButton b = new JButton();
		b.setText("Simple button");
		this.component = b;
	}

}
