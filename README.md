# PROJECT DETAILS

**Project Name: REPL**

Team members and contributions: sksitara, ssdhulip
Estimated time: 25 hours
Link to repo: https://github.com/cs0320-f23/repl-sksitara-ssdhulip

# DESIGN CHOICES

Relationships between classes/interfaces:
We sorted our components classes based on their functionality. The main class where the program is
started is the app class. We create the repl header and in here as well as instantiate the REPL.
Within REPL we create our text input box and create the history section of the page. History stores
our previous outputs and potentially commands. Within our REPL input class we deal with the main
logic of getting the command and calling the command's method using the REPLFunctionMap. This map
is stored in the REPLFunction class which contains the command methods and what they do. The actual
load, view, search, and broadband methods in REPLFunction are able to work by fetching information
from the backend through using fetch. We get the result if it is successful or not and with that we
output either the successful information we need to show or the error that resulted. The back end is
dealt with through handlers for each functionality and uses a CSVParser and CSVSearcher to parse and
search through the CSV files. 

Some key design choices include:

- For accessibility, we decided to use several keyboard shortcuts to allow for the user to not have
to use a mouse/trackpad at all. These shortcuts are specified in the How To portion of the README. 
- Additionally, for magnification the command input box will always be present and partially visible
even when zoomed in all the way to 500%. There are also separate scroll features for scrolling
through the entire webpage and just the command history.
- We used dependency injection by using interfaces for each class to define certain values and
setters for them. This injects some dependency on developers using the program, who may want to
change how some components work. Additionally, the user can input their commands of choice while
following the formatting of the REPLFunction interface. 
- We used mocked data in the form of 2d string arrays to represent parsed CSV files. This allowed
us to mock searching, viewing, and loading data. We did mock testing in addition to back end
end, integration, and unit testing because the mock testing will work even if the back end/internet
is down.
- The user can load a file while specifying with_header or without_header, but if not specified it
will default to no header. 
- The user can search with just a target value or with a target value and a column identifier (if
the file has a header) that is a number or string.
- For search if you have a target or column identifier that is two words you must use an underscore
instead of a space (Ex: Rhode Island is Rhode_Island and Santa Clara is Santa_Clara)

# ERRORS/BUGS

One issue that we noticed with playwright testing through the back end was that the fetch calls are
made simultaneously to different links which causes the tests to all pass sometimes but have a few 
issues when running it other times. When we run the tests individually on npx playwright --ui they 
all pass so we know the tests are working. Because of this issue we also did a lot of mock tests 
that don't rely on the server. We are not aware of any other bugs at this point. However, here 
are certain choices we made for the sake of simplicity that aren't the best way of dealing with edge
cases. Empty files that are loaded will simply show empty results when attempted to view. Similarly,
empty search results will simply show nothing which should hopefully prompt the user to realize 
their search value either isn't in the file or isn't in the column they specified. 

# TESTS

We have back-end tests and front-end tests that we adapted from our previous two sprints. For the
integration tests we used our testing ideas from mock to test relations such as reloaded and
searching the same file with and without a header etc. We unit tests the commands too along with a 
command we added called name which says Hi [name] that we added in to test the feature of a 
programmer developer trying to establish new commands. 

# HOW TO...

How to run tests:
To run the back-end tests you can go to the testing files in the back-end folders and click run. To
run the integration, front-end, and unit tests you can run npx playwright test in the terminal after
cd to the front-end-code folder. 

How to build and run program:
To run the server in the background you must go to main and run it which starts the localhost
server. Program can be run by running npm start in the terminal, and opening the local host link
provided.

The valid commands are as follows:
load_file <filepath/filename>
load_file <filepath/filename> with_header
load_file <filepath/filename> without_header
view
search <target_value> <column_name/column_index>
search <target_value>
broadband <state_name> <county_name>
mode (can also just click the button)

The command shortcuts are as follows: 
cmd/ctrl + i: allows you to start typing in the command input box
cmd/ctrl + b: allows you to switch the mode
cmd/ctrl + ArrowUp: allows you to scroll up in the command history specifically
cmd/ctrl + ArrowDown: allows you to scroll down in the command history specifically
Enter: allows you to submit a command

To register and use a new command:
The command must have a function that is written by the programmer developer that has some sort of
functionality that is also up to the developer. For example we registered a new fake command called
name that takes in name [insert_name] and returns hi [name] in the website. The command can be
registered by setting it in the hashmap using REPLFunctionMap.set("command_name", command_function)
