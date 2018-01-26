# Model
一个大型Web App通常有几十个映射表，一个映射表就是一个Model。所以需要一个统一的模型，强迫所有Model都遵循同一个规范，这样不但实现简单，而且容易统一风格。代码还可以复用

## Model遵守的一套规范
1. Model存放的文件夹必须在`models`内，并且以Model名字命名，例如：`Pet.js`,`User.js`等等；
2. 统一主键，名称必须是`id`，类型必须是`STRING(50)`；
3. 主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
4. 所有字段默认为NOT NULL，除非显式指定；
5. 统一timestamp机制，每个Model必须有`createdAt`、`updatedAt`和`version`，分别记录创建时间，修改时间和版本号。其中，`createdAt`和`updatedAt`以`BIGINT`存储时间戳，最大的好处是无需处理时区，排序方便。`version`每次修改时自增。
