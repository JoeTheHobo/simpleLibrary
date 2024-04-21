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
- `ls.save(name, value)`: Save data to local storage.
- `ls.get(name, result)`: Retrieve data from local storage.
- `ls.clear()`: Clear local storage or a specific item.
- `ls.delete(name)`: Delete a specific item from local storage.
- `ls.log()`: Log all items stored in local storage.
- `ls.facts()`: Display usage statistics of local storage.

### ProTimer
- `Timer`: A class for creating, managing, and measuring time intervals.

## Usage
To use this library, simply include the provided JavaScript file in your project, and you can start utilizing its methods as needed.

For detailed documentation and usage examples, refer to the comments within the code.

## Contribution
Contributions and feedback are welcome! If you find any issues or have suggestions for improvements, please feel free to create an issue or pull request on the GitHub repository.

## License
This library is provided under the [MIT License](LICENSE).

