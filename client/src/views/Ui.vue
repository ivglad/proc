<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const input = ref({
  value: '',
})

const select = ref({
  value: '',
  list: [
    {
      name: 'Magnitogorsk',
    },
    {
      name: 'Saint Petersburg',
    },
    {
      name: 'Moscow',
    },
  ],
})

const tree = ref({
  value: '',
  nodes: [
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-cog',
          children: [
            {
              key: '0-0-0',
              label: 'Expenses.doc',
              icon: 'pi pi-fw pi-file',
              data: 'Expenses Document',
            },
            {
              key: '0-0-1',
              label: 'Resume.doc',
              icon: 'pi pi-fw pi-file',
              data: 'Resume Document',
            },
          ],
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-home',
          children: [
            {
              key: '0-1-0',
              label: 'Invoices.txt',
              icon: 'pi pi-fw pi-file',
              data: 'Invoices for this month',
            },
          ],
        },
      ],
    },
  ],
})

const accordion = ref({
  tabs: [
    { title: 'Title 1', content: 'Content 1', value: '0' },
    { title: 'Title 2', content: 'Content 2', value: '1' },
    { title: 'Title 3', content: 'Content 3', value: '2' },
    { title: 'Title 4', content: 'Content 4', value: '3' },
    { title: 'Title 5', content: 'Content 5', value: '4' },
    { title: 'Title 6', content: 'Content 6', value: '5' },
    { title: 'Title 7', content: 'Content 7', value: '6' },
    { title: 'Title 8', content: 'Content 8', value: '7' },
    { title: 'Title 9', content: 'Content 9', value: '8' },
    { title: 'Title 10', content: 'Content 10', value: '9' },
  ],
})

const contextMenu = ref()
const contextItems = ref([
  { label: 'Copy', icon: 'pi pi-copy' },
  { label: 'Rename', icon: 'pi pi-file-edit' },
])
const onImageRightClick = (e) => {
  contextMenu.value.show(e)
}

const menu = ref()
const menuItems = ref([
  {
    label: 'Documents',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
      },
    ],
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
      },
    ],
  },
])
const menuToggle = (e) => {
  menu.value.toggle(e)
}

const toast = useToast()
const showOverlayMessage = () => {
  toast.add({
    severity: 'secondary',
    summary: 'Secondary Message',
    detail: 'Message Content',
    life: 3000,
  })
}

const toastMessage = ref('')
const blocked = ref(false)
const blockDocument = () => {
  blocked.value = true

  const timer = ref(3)
  toastMessage.value = `Разблокировка документа через ${timer.value} секунды`

  toast.add({
    severity: 'secondary',
    summary: 'Ожидайте...',
    detail: toastMessage.value,
    life: 3000,
  })

  const interval = setInterval(() => {
    timer.value--
    toastMessage.value = `Разблокировка документа через ${timer.value} секунды`
    if (timer.value <= 0) {
      toastMessage.value = ''
      clearInterval(interval)
    }
  }, 1000)

  setTimeout(() => {
    blocked.value = false
    toast.add({
      severity: 'secondary',
      summary: 'Готово',
      detail: 'Документ готов',
      life: 2000,
    })
  }, 3000)
}
</script>

<template>
  <div class="ui">
    <h2>Buttons</h2>
    <section class="buttons">
      <Button
        label="Primary"
        v-tooltip="{
          value: 'Info message',
          pt: {
            arrow: {
              style: {
                borderLeftColor: 'var(--p-primary-color)',
                borderRightColor: 'var(--p-primary-color)',
              },
            },
            text: '!bg-primary !text-primary-contrast !font-medium',
          },
        }" />
      <Button
        label="Secondary"
        severity="secondary"
        badge="2"
        badgeSeverity="contrast" />
      <Button label="Secondary" severity="secondary" text />
      <Button label="Success" severity="success" outlined />
      <Button label="Info" severity="info" />
      <Button label="Warn" severity="warn" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
      <Button label="Contrast" severity="contrast" />
      <Button label="Submit" disabled />
    </section>

    <h2>Inputs</h2>
    <section>
      <InputText
        v-model="input.value"
        type="text"
        size="small"
        placeholder="Small" />
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="input.value" placeholder="Search" />
      </IconField>
      <div class="input-help">
        <label for="username">Имя пользователя</label>
        <InputText
          id="username"
          v-model="input.value"
          aria-describedby="username-help" />
        <small id="username-help">Введите имя пользователя</small>
      </div>
      <InputText
        type="text"
        v-model="input.value"
        placeholder="Filled"
        variant="filled" />
      <InputText v-model="input.value" :invalid="!input.value" />
      <Message severity="error" v-if="!input.value"
        >Поле не должно быть пустым</Message
      >
      <InputText v-model="input.value" disabled placeholder="Disabled" />
      <Password v-model="input.value" :feedback="false" toggleMask />
    </section>

    <h2>Select</h2>
    <section>
      <Select
        v-model="select.value"
        :options="select.list"
        optionLabel="name"
        placeholder="Выберите город" />
      <SelectButton
        v-model="select.value"
        :options="select.list"
        optionLabel="name"
        multiple
        aria-labelledby="multiple" />
    </section>

    <h2>Tree</h2>
    <section>
      <Tree
        v-model:selectionKeys="tree.value"
        :value="tree.nodes"
        selectionMode="single" />
    </section>

    <h2>Accordion</h2>
    <section>
      <Accordion :value="['0']" multiple>
        <AccordionPanel value="0">
          <AccordionHeader>Header I</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader>Header II</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="2">
          <AccordionHeader>Header III</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </section>

    <h2>Divider</h2>
    <section>
      <Divider align="center" type="dotted">
        <b>Center</b>
      </Divider>
    </section>

    <Fieldset legend="Header" :toggleable="true">
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      </p>
    </Fieldset>

    <ScrollPanel
      style="width: 100%; height: 100px"
      :dt="{
        bar: {
          background: '{primary.color}',
        },
      }">
      <p>Scroll panel !!!!!!!!!!!!</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
      </p>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
      </p>
      <p class="m-0">
        Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
        dolor repellendus. Temporibus autem quibusdam et aut officiis debitis
      </p>
    </ScrollPanel>

    <Tabs value="0" scrollable>
      <TabList>
        <Tab
          v-for="(tab, index) in accordion.tabs"
          :key="tab.title"
          :value="tab.value"
          :disabled="index === 2"
          >{{ tab.title }}</Tab
        >
      </TabList>
      <TabPanels>
        <TabPanel
          v-for="tab in accordion.tabs"
          :key="tab.content"
          :value="tab.value">
          <p class="m-0">{{ tab.content }}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <h2>Context menu</h2>
    <section>
      <img
        alt="Logo"
        src="@/assets/img/vip/movies-logo.jpg"
        :style="{ width: '300px' }"
        @contextmenu="onImageRightClick"
        aria-haspopup="true" />
      <ContextMenu ref="contextMenu" :model="contextItems" />
    </section>
    <!-- <ContextMenu global :model="contextItems" /> -->

    <h2>Menu</h2>
    <section class="menu">
      <Menu :model="menuItems" />
      <Button
        label="Menu"
        type="button"
        :style="{ width: '100px', height: '40px' }"
        @click="menuToggle"
        aria-haspopup="true"
        aria-controls="overlay_menu" />
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
      <PanelMenu :model="menuItems" multiple />
    </section>

    <Toast>
      <template #container="{ message }">
        <div>{{ message.summary }}</div>
        <div>
          {{ toastMessage ?? message.detail }}
        </div>
      </template>
    </Toast>
    <Button
      label="Всплывающее сообщение"
      severity="secondary"
      :style="{ width: 'fit-content' }"
      @click="showOverlayMessage" />

    <OverlayBadge
      value="4"
      severity="contrast"
      :style="{ width: 'fit-content' }">
      <Avatar label="A" size="large" />
    </OverlayBadge>
    <Badge value="2" size="small" :style="{ width: 'fit-content' }"></Badge>

    <BlockUI :blocked="blocked" fullScreen />
    <Button
      label="Заблокировать документ"
      @click="blockDocument"
      :style="{ width: 'fit-content' }" />

    <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px' }">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px' }">
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="150px"></Skeleton>
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px' }">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
      </div>
    </div>

    <ProgressBar :value="50"></ProgressBar>

    <Tag severity="warn" value="Warn"></Tag>
  </div>
</template>

<style lang="sass" scoped>

.ui
  display: flex
  flex-direction: column
  gap: 20px
  width: 100%
  height: 100%
  padding: 40px
  section
    display: flex
    flex-direction: column
    gap: 10px
  .buttons
    display: grid
    grid-template-columns: repeat(3, 1fr)
  .input
    &-help,
    &-invalid
      display: flex
      flex-direction: column
  .menu
    display: grid
    grid-template-columns: repeat(5, 1fr)
</style>
