# Koa API Starter

# Backend Setup

1. Download or clone the repository

## Install MySQL on Ubuntu:

###2. To install MySQL, run the following command from a terminal prompt:

`sudo apt-get update`
`sudo apt-get install mysql-server`

###3. Once the installation is complete, the MySQL server should be started automatically. You can run the following command from a terminal prompt to check whether the MySQL server is running:

`sudo netstat -tap | grep mysql`

When you run this command, you should see the following line or something similar:

```
tcp        0      0 localhost:mysql         *:*                LISTEN      2556/mysqld
```

If the server is not running correctly, you can type the following command to start it:

```
sudo systemctl restart mysql.service
```

###4. Allow remote access

If you have iptables enabled and want to connect to the MySQL database from another machine, you must open a port in your server’s firewall (the default port is 3306). You don’t need to do this if the application that uses MySQL is running on the same server.

Run the following command to allow remote access to the mysql server:

`sudo ufw allow mysql`

###5. Start the mysql shell

There is more than one way to work with a MySQL server, but this article focuses on the most basic and compatible approach, the mysql shell.

At the command prompt, run the following command to launch the mysql shell and enter it as the root user:

`/usr/bin/mysql -u root -p`

###6. When you’re prompted for a password, enter the one that you set at installation time, or if you haven’t set one, press Enter to submit no password.

The following mysql shell prompt should appear:

```
mysql>
```

###7. Set the root password

If you logged in by entering a blank password, or if you want to change the root password that you set, you can create or change the password.

- For versions earlier than MySQL 5.7, enter the following command in the mysql shell, replace password with your new password:

`UPDATE mysql.user SET Password = PASSWORD('password') WHERE User = 'root';`

- For version MySQL 5.7 and later, enter the following command in the mysql shell, replacing password with your new password:

`UPDATE mysql.user SET authentication_string = PASSWORD('password') WHERE User = 'root';`

- To make the change take effect, reload the stored user information with the following command:

`FLUSH PRIVILEGES;`

###8. View users

MySQL stores the user information in its own database. The name of the database is mysql. Inside that database the user information is in a table, a dataset, named user. If you want to see what users are set up in the MySQL user table, run the following command:

`SELECT User, Host, authentication_string FROM mysql.user;`

###9. Create a database

`CREATE DATABASE koa_api_db;`

###10. Open your terminal inside koa-api-starter folder and run

    `npm install`

    npm will install all the required packages.

###11. After finishing installing all packages, run

    `npm run dev`

###12. Troubleshooting

    - Changing the database name, user, password for the project.

    - Open config folder
    - Open config.json file and change the values of username, password, database as required

    ```
    "development": {
        "username": "root",
        "password": "root",
        "database": "koa_api_db",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "secret": "SUPER_SECRET-PASSWORD!123?"
    }
    ```

    - Save and close the file.

## Install MySQL on Mac OS:

###1. Install MySQL with Homebrew

Using Homebrew service to download

Homebrew is a package manager for Mac which greatly simplifies the process of installing command line software and tools on a Mac. It’s one of the most common ways to install an app on Mac.

##To install Homebrew, open Terminal and run:

    ```
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

    Note: Homebrew will download and install Command Line Tools for Xcode as part of the installation process. This might take a lot of time since those apps are not lightweight.

    Then install MySQL using Homebrew:

    ```
    \$ brew install mysql
    ```

    Install brew services:

    ```
    \$ brew tap homebrew/services
    ```

    Load and start the MySQL service:

    ```
    \$ brew services start mysql
    ```

    Expected output: Successfully started mysql (label: homebrew.mxcl.mysql)

    Open Terminal and execute the following command to set the root password:

    `mysqladmin -u root password 'yourpassword'`

    Now your MySQL server is ready.
