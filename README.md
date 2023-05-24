# grunt-contrib-icon2css

## Getting Started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-icon2css [--save-dev]
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-icon2css');
```

### **Note that only SVG format is supported at the moment**

### Usage

#### Example #1 (minimal usage)

```js
icon2css: {
  default: {
    files: [{
      expand: true,
      cwd: './source/',
      src: ['icons/*.svg'],
      dest: './source/'
    }]
  }
}
```

#### Example #2

```js
icon2css: {
  default: {
    output: 'icons.css',

    options: {
      encode: 'xml|base64',
      selector: ['.icon-$1'],
    },

    files: [{
      expand: true,
      cwd: './source/',
      src: ['icons/*.svg'],
      dest: './source/'
    }]
  }
}
```

#### Example #3

```js
icon2css: {
  dark: {
    output: 'icons.dark.css',

    options: {
      encode: 'xml|base64',
      selector: ['.icon-$1.dark'],
      colors: [{
        color: '#444444'
      }]
    },

    files: [{
      expand: true,
      cwd: './source/',
      src: ['icons/*.svg'],
      dest: './source/'
    }]
  }
}
```

#### Example #4

```js
icon2css: {
  theme1: {
    output: 'icons.theme1.css',

    options: {
      encode: 'xml|base64',
      selector: ['.icon-$1.theme1'],
      colors: [{
        color: '#000000',
        replace: '#444444'
      }]
    },

    files: [{
      expand: true,
      cwd: './source/',
      src: ['icons/*.svg'],
      dest: './source/'
    }]
  }
}
```