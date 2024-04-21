# Simple JavaScript Utility Library

## Introduction
This is a simple utility library for JavaScript, created by JoeTheHobo (John Jones), aiming to simplify common tasks and provide additional functionalities. It includes methods for manipulating objects, arrays, DOM elements, and more.

### Version
Version: 15

## Methods Overview
Below is a brief overview of the key methods provided in this library:

### Object Manipulation
- `classRemove(classes)`: Remove specified classes from the object's class list.
- `classAdd(classes)`: Add specified classes to the object's class list.
- `$P(x)`: Get the parent node of the object.
- `$()`: Select DOM elements by CSS selector.

### Array Manipulation
- `each(type, func)`: Perform actions on each element of the array.
- `sum()`: Calculate the sum of all elements in the array.
- `avg()`: Calculate the average of all elements in the array.
- `high()`: Get the highest value in the array.
- `low()`: Get the lowest value in the array.
- `median()`: Get the median value of the array.
- `mode()`: Get the mode value of the array.
- `shuffle()`: Shuffle the elements of the array.

### Miscellaneous
- `getType(object, detailed)`: Get the type of the object.
- `rnd(num, to, exp)`: Generate random numbers, letters, or colors.
- `create(elem, x)`: Create DOM elements with specified attributes.
- `repeat(count, func, func2, inverse)`: Repeat actions based on count or arrays.
- `slog()`: Enhanced console logging function.

### Local Storage (LS) Handling
# LS Version 3

## Introduction
LS Version 3 (Localstorage V3) is a JavaScript library that provides a simple interface for working with the browser's localStorage. It offers methods for saving, retrieving, deleting, and managing data within the localStorage, with the added feature of organizing data within different storage groups.

## Installation
To use LS Version 3 in your project, include the `ls.js` file in your HTML document:

```html
<script src="ls.js"></script>
```

## Usage

### Setting Unique ID
Before using any other methods, you can set a unique ID for your project using the `setID` method. This ID will be used to organize data within localStorage.

```javascript
ls.setID("projectID");
```

### Saving Data
You can save any value (arrays, objects, numbers, strings) to localStorage using the `save` method.

```javascript
ls.save("name", value);
```

### Retrieving Data
Retrieve data from localStorage using the `get` method. If the requested data is not found, you can specify a default value to return.

```javascript
let data = ls.get("name", defaultValue);
```

### Clearing Data
Clear all items from localStorage using the `clear` method. Optionally, you can delete all items or only those associated with the current project ID.

```javascript
ls.clear(); // Clears items associated with current project ID
ls.clear(true); // Clears all items in localStorage
```

### Deleting Data
Delete a specific item from localStorage using the `delete` method.

```javascript
ls.delete("name");
```

### Logging Data
Log all items in localStorage using the `log` method. You can choose to log only items associated with the current project ID or all items.

```javascript
ls.log(); // Log items associated with current project ID
ls.log(true); // Log all items in localStorage
```

### Storage Statistics
Retrieve storage statistics using the `facts` method. This method provides information on total storage capacity, usage, and usage breakdown by storage group.

```javascript
ls.facts();
```

## Advanced Usage

### Storage Groups
LS Version 3 allows you to organize data into different storage groups. Each group can have its own set of data, providing better organization and management.

#### Creating Groups
To create a new storage group, simply set a unique ID using the `setID` method before saving any data.

```javascript
ls.setID("groupID");
```

#### Accessing Group Data
Once a group ID is set, all subsequent data operations (save, get, delete) will be performed within that group.


### ProTimer
- `Timer`: A class for creating, managing, and measuring time intervals.

## Usage
To use this library, simply include the provided JavaScript file in your project, and you can start utilizing its methods as needed.

For detailed documentation and usage examples, refer to the comments within the code.

## Contribution
Contributions and feedback are welcome! If you find any issues or have suggestions for improvements, please feel free to create an issue or pull request on the GitHub repository.


