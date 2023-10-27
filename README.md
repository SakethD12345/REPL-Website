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
to use a mouse/trackpad at all 
- We used dependency injection by using interfaces for each class to define certain values and
  setters for them. This injects some dependcy on developers using the program, who may want to
  change how some components work
- We used mocked data in the form of 2d string arrays to represent parsed CSV files. This allowed
  us to mock searching, viewing, and loading data
- For specific search parameters, we returned the the header if it exists along with the first row
  of data to mock the searching functionality. This is because the back end would actually produce
  results, so we just had to return something to know it works. See comments for further detail.

# ERRORS/BUGS

We are not aware of any bugs at this point. In the process of making our command line program, we
dealt with various issues. One was dealing with empty files, specifically being able to view them.
Additionally we originally built our program to not have ask the user whether or not files have
headers, but it caused issues down the line for searching. We had to change this to ask the user to
declare whether the file has header or not when loading.

# TESTS



# HOW TO...

How to run tests:
Run tests by running "npx playwright test" in the terminal

How to build and run program:
Program can be run by running npm start in the terminal, and opening the local server link
provided.

The valid commands are as follows:
load_file <filepath/filename> with_header
load_file <filepath/filename> without_header
view
search <column_name/column_index> <target_value>
search <target_value>
mode

If you don't enter the following commands, the site will prompt you to enter a valid command