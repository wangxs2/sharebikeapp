<template>
  <div class="postSize">
    <div class="urlBox">
      <div class="leftInput">
        <el-input placeholder="请输入url" v-model="url" style="width:100%">
          <el-select v-model="type" slot="prepend" placeholder="请选择请求方式" style="width:200px;">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-plus" @click="addParams">params</el-button>
        </el-input>
      </div>
      <div class="rightBtn">
        <el-button type="primary" @click="subBtn">Send</el-button>
      </div>
    </div>
    <div class="reqBox">
      <el-form label-width="100px">
        <el-row :gutter="20" v-for="(param,index) in params.param" :key="index">
          <el-col :span="10">
            <el-form-item :label="'参数' + (index + 1)">
              <el-input v-model="param.key" placeholder="key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-input v-model="param.value" placeholder="value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click.prevent="removeParams(param)">删除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="resBox">
      <span>Response：</span>
      <el-input type="textarea" :autosize="{ minRows: 30, maxRows: 30}" v-model="resData">
      </el-input>
    </div>
    <div v-html="jsonData"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "GET",
      url: "",
      params: {
        param: [{}]
      },
      resData: "",
      jsonData:''
    };
  },
  methods: {
    addParams() {
      //添加参数
      this.params.param.push({
        time: Date.now()
      });
    },
    removeParams(val) {
      //删除参数
      let index = this.params.param.indexOf(val);
      this.params.param.splice(index, 1);
    },
    subBtn() {
      //提交
      let obj = {};
      $.each(this.params.param, (index, item) => {
        obj[item.key] = item.value;
      });
      switch (this.type) {
        case "GET":
          this.$fetchGet(this.url, obj).then(res => {
            this.resData = this.FormJons(JSON.stringify(res));
          });
          break;
        case "POST":
          this.$fetchPost(this.url, obj).then(res => {
            this.resData = this.FormJons(JSON.stringify(res));
          });
          break;
      }
    },
    FormJons(json, options) {
      var reg = null,
        formatted = "",
        pad = 0,
        PADDING = "    ";
      options = options || {};
      options.newlineAfterColonIfBeforeBraceOrBracket =
        options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
      options.spaceAfterColon =
        options.spaceAfterColon === false ? false : true;
      if (typeof json !== "string") {
        json = JSON.stringify(json);
      } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
      }
      reg = /([\{\}])/g;
      json = json.replace(reg, "\r\n$1\r\n");
      reg = /([\[\]])/g;
      json = json.replace(reg, "\r\n$1\r\n");
      reg = /(\,)/g;
      json = json.replace(reg, "$1\r\n");
      reg = /(\r\n\r\n)/g;
      json = json.replace(reg, "\r\n");
      reg = /\r\n\,/g;
      json = json.replace(reg, ",");
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ":{");
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ":[");
      }
      if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ":");
      }
      json.split("\r\n").forEach(function(node, index) {
        var i = 0,
          indent = 0,
          padding = "";

        if (node.match(/\{$/) || node.match(/\[$/)) {
          indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
          if (pad !== 0) {
            pad -= 1;
          }
        } else {
          indent = 0;
        }

        for (i = 0; i < pad; i++) {
          padding += PADDING;
        }

        formatted += padding + node + "\r\n";
        pad += indent;
      });
      // this.Process(formatted)
      return formatted;
    },
    Process(json) {
      window.TAB = "    ";
      function IsArray(obj) {
        return (
          obj &&
          typeof obj === "object" &&
          typeof obj.length === "number" &&
          !obj.propertyIsEnumerable("length")
        );
      }
      let obj = eval("[" + json + "]");
      let html = "";
      html = ProcessObject(obj[0], 0, false, false, false);
      this.jsonData = "<PRE class='CodeContainer'>" + html + "</PRE>";

      function ProcessObject(
        obj,
        indent,
        addComma,
        isArray,
        isPropertyContent
      ) {
        var html = "";
        var comma = addComma ? "<span class='Comma'>,</span> " : "";
        var type = typeof obj;
        if (IsArray(obj)) {
          if (obj.length == 0) {
            html += GetRow(
              indent,
              "<span class='ArrayBrace'>[ ]</span>" + comma,
              isPropertyContent
            );
          } else {
            html += GetRow(
              indent,
              "<span class='ArrayBrace'>[</span>",
              isPropertyContent
            );
            for (var i = 0; i < obj.length; i++) {
              html += ProcessObject(
                obj[i],
                indent + 1,
                i < obj.length - 1,
                true,
                false
              );
            }
            html += GetRow(indent, "<span class='ArrayBrace'>]</span>" + comma);
          }
        } else {
          if (type == "object" && obj == null) {
            html += FormatLiteral("null", "", comma, indent, isArray, "Null");
          } else {
            if (type == "object") {
              var numProps = 0;
              for (var prop in obj) {
                numProps++;
              }
              if (numProps == 0) {
                html += GetRow(
                  indent,
                  "<span class='ObjectBrace'>{ }</span>" + comma,
                  isPropertyContent
                );
              } else {
                html += GetRow(
                  indent,
                  "<span class='ObjectBrace'>{</span>",
                  isPropertyContent
                );
                var j = 0;
                for (var prop in obj) {
                  html += GetRow(
                    indent + 1,
                    '<span class="PropertyName">"' +
                      prop +
                      '"</span>: ' +
                      ProcessObject(
                        obj[prop],
                        indent + 1,
                        ++j < numProps,
                        false,
                        true
                      )
                  );
                }
                html += GetRow(
                  indent,
                  "<span class='ObjectBrace'>}</span>" + comma
                );
              }
            } else {
              if (type == "number") {
                html += FormatLiteral(
                  obj,
                  "",
                  comma,
                  indent,
                  isArray,
                  "Number"
                );
              } else {
                if (type == "boolean") {
                  html += FormatLiteral(
                    obj,
                    "",
                    comma,
                    indent,
                    isArray,
                    "Boolean"
                  );
                } else {
                  if (type == "function") {
                    obj = FormatFunction(indent, obj);
                    html += FormatLiteral(
                      obj,
                      "",
                      comma,
                      indent,
                      isArray,
                      "Function"
                    );
                  } else {
                    if (type == "undefined") {
                      html += FormatLiteral(
                        "undefined",
                        "",
                        comma,
                        indent,
                        isArray,
                        "Null"
                      );
                    } else {
                      html += FormatLiteral(
                        obj,
                        '"',
                        comma,
                        indent,
                        isArray,
                        "String"
                      );
                    }
                  }
                }
              }
            }
          }
        }
        return html;
      }

      function FormatLiteral(literal, quote, comma, indent, isArray, style) {
        if (typeof literal == "string") {
          literal = literal
            .split("<")
            .join("&lt;")
            .split(">")
            .join("&gt;");
        }
        var str =
          "<span class='" +
          style +
          "'>" +
          quote +
          literal +
          quote +
          comma +
          "</span>";
        if (isArray) {
          str = GetRow(indent, str);
        }
        return str;
      }
      function FormatFunction(indent, obj) {
        var tabs = "";
        for (var i = 0; i < indent; i++) {
          tabs += window.TAB;
        }
        var funcStrArray = obj.toString().split("\n");
        var str = "";
        for (var i = 0; i < funcStrArray.length; i++) {
          str += (i == 0 ? "" : tabs) + funcStrArray[i] + "\n";
        }
        return str;
      }
      function GetRow(indent, data, isPropertyContent) {
        var tabs = "";
        for (var i = 0; i < indent && !isPropertyContent; i++) {
          tabs += window.TAB;
        }
        if (
          data != null &&
          data.length > 0 &&
          data.charAt(data.length - 1) != "\n"
        ) {
          data = data + "\n";
        }
        return tabs + data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.postSize {
  width: 65%;
  height: 100%;
  margin: 100px auto;
  font-size: 14px;
  font-family: consolas;
  .urlBox {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .leftInput {
      flex: 1;
    }
    .rightBtn {
      padding-left: 20px;
      box-sizing: border-box;
      width: 100px;
    }
  }
  .reqBox {
    width: 100%;
    margin-bottom: 20px;
  }
  .resBox {
    width: 100%;
  }
}
pre {
  font-family: "consolas";
}
.Canvas {
  font: 14px/18px "consolas";
  background-color: #ececec;
  color: #000000;
  border: solid 1px #cecece;
}
.ObjectBrace {
  color: #00aa00;
  font-weight: bold;
}
.ArrayBrace {
  color: #0033ff;
  font-weight: bold;
}
.PropertyName {
  color: #cc0000;
  font-weight: bold;
}
.String {
  color: #007777;
}
.Number {
  color: #aa00aa;
}
.Boolean {
  color: #0000ff;
}
.Function {
  color: #aa6633;
  text-decoration: italic;
}
.Null {
  color: #0000ff;
}
.Comma {
  color: #000000;
  font-weight: bold;
}
PRE.CodeContainer {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
