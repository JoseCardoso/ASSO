/*
 * Created on Oct 26, 2004
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package framework;

import java.awt.Component;

/**
 * @author aaguiar
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public abstract class Plugin {

	protected String name ="unnamed";
	protected Component component = null;

	/**
	 * @return
	 */
	public String getName() {
		// TODO Auto-generated method stub
		return name;
	}

	/**
	 * @return
	 */
	public Component getComponent() {
		// TODO Auto-generated method stub
		return component;
	}
	

}
