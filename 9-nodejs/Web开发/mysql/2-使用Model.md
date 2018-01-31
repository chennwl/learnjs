# Model
一个大型Web App通常有几十个映射表，一个映射表就是一个Model。所以需要一个统一的模型，强迫所有Model都遵循同一个规范，这样不但实现简单，而且容易统一风格。代码还可以复用

## Model遵守的一套规范
1. Model存放的文件夹必须在`models`内，并且以Model名字命名，例如：`Pet.js`,`User.js`等等；
2. 统一主键，名称必须是`id`，类型必须是`STRING(50)`；
3. 主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
4. 所有字段默认为NOT NULL，除非显式指定；
5. 统一timestamp机制，每个Model必须有`createdAt`、`updatedAt`和`version`，分别记录创建时间，修改时间和版本号。其中，`createdAt`和`updatedAt`以`BIGINT`存储时间戳，最大的好处是无需处理时区，排序方便。`version`每次修改时自增。

## 数据库配置
- 把简单的config.js拆成3个配置文件：
    - config-default.js：存储默认的配置；
    - config-override.js：存储特定的配置；
    - config-test.js：存储用于测试的配置。
- 好处：
    - 开发环境下，团队统一使用默认的配置，并且无需`config-override.js`
    - 部署到服务器时，由运维团队配置好`config-override.js`，以覆盖`config-override.js`的默认设置
    - 测试环境下，本地和CI服务器统一使用`config-test.js`，测试数据库可以反复清空，不会影响开发

## 使用Model
- 要使用Model，先引入对应的Model文件。这时候就需要自动扫描并导入所有的Model。
- 其实不需要创建表的SQL，因为Sequelize提供了一个`sync()`方法，可以自动创建数据库。这个功能在开发和生产环境中没有什么用，但是在测试环境中非常有用。测试时，可以用`sync()`方法自动创建出表结构，而不是自己维护SQL脚本。这样，可以随时修改Model的定义，并立刻运行测试。开发环境下，首次使用`sync()`也可以自动创建出表结构，避免了手动运行SQL的问题。
