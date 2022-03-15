const { transform } = require('@babel/core')
const options = {
    plugins: [ ['./plugins/babel-plugin-example/src/index.js', {
        option1: true,
        options2: false
    }] ]
}

const code = `
    const str1 = 'hello'
    console.log(str1)
    const str2 = 'babel'
    console.log(str2)
    const str3 = 'plugin'
    console.log(str3)
`

transform(code, options, function(err, result) {
  if (err) {
    console.log('err', err)
    return
  }
  console.log(result)
})
