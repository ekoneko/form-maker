A react drag and drop form maker

simple demo: [http://ekoneko.github.io/form-maker](http://ekoneko.github.io/form-maker)

## how to use

This is a [sample](https://github.com/ekoneko/form-maker-demo/blob/master/src/index.tsx).

```
import {FormMaker, ProtoBench, WorkBench, EditBench} from 'form-maker'

<FormMaker>
  <ProtoBench
    protoList={formFields}
    style={}
  />
  <WorkBench
    onChange={this.handleChange}
    style={}
  />
  <EditBench style={} />
</FormMaker>
```

### ProtoBench

`ProtoBench` is a area to display all fields which can drop to workbench.

#### formFields

`formFields` support to `ProtoBench`'s `protoList` prop. It use to define field scheme.

The struct about `formField` like this [sample](https://github.com/ekoneko/form-maker-demo/blob/master/src/components/FormFIelds/Input/index.tsx)

```
{
  type: 'input',
  params: {
    title: 'Input',
    placeholder: '',
    multiple: false,
  },
  renderProto: () => {
    return <ProtoItem />
  },
  renderWork: (params) => {
    return <WorkItem params={params} />
  },
  renderEditParam: (params, onChange) => {
    return <EditParam params={params} onChange={onChange} />
  },
}
```

1. `type`: the field's type. It's a string whatever you like, but must be unique.
2. `params`: the field's default props.
3. `renderProto`: A function return what to display on protoBench.
4. `renderWork`: A function return what to display on workBench. It gets params argument
5. `renderEditParam`: A function return what to display on EditBench. It gets params, and a `onChange` function to update the field's custom params.

### WorkBench

`WorkBench` is a area to create and design your form.

You can drag fields from protoBench and drop here, and sort them.

#### onChange

Everytime workBench get a new field or sort or edit field's params, it will trigger a onChange function.

It will return a array like [{type, params}, ...].

### EditBench

`EditBench` is a area to edit field(in workBench)'s params. It don't have any params.

### FormMaker

`FormMaker` component must wrap `ProtoBench`, `WorkBench` and `EditBench`. It supports context to each bench.

Btw, you can also wrap benchs in some layout components like below. Just ensure every benches are wrapped by `FormMaker`.

```
<FormMaker>
  <div class="xxx">
    <ProtoBench>
  </div>
  ...
```
