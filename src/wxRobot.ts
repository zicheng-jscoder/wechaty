import { Message, Wechaty as WechatyType } from '_wechaty@0.60.12@wechaty'
import { Wechaty } from 'wechaty'
import { ContactSelf } from '_wechaty@0.60.12@wechaty/dist/src/user/contact-self'

class Robot {
  name = 'wechat-puppet-wechat'
  robot: WechatyType
  constructor() {
    this.robot = new Wechaty({
      name: this.name // generate xxxx.memory-card.json and save login data for the next login
    })
    this.init()
  }
  //   初始化机器人
  async init() {
    this.robot.on!('scan', this.onScan)
    this.robot.on!('login', (user: ContactSelf) => this.onLogin(user))
    this.robot.on!('logout', this.onLogout)

    this.robot.on!('message', (msg: Message) => this.onMessage(msg))

    await this.robot.start!()
      .then(() => {
        console.log('开始登陆微信')
      })
      .catch((e: Error) => {
        console.error(e)
      })
  }

  //   扫码登录
  onScan(qrcode: string) {
    require('qrcode-terminal').generate(qrcode) // 在console端显示二维码
    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode)
    ].join('')
    console.log(qrcodeImageUrl)
  }

  // 登录成功时触发
  async onLogin(user: ContactSelf) {
    console.log(`贴心小助理${user}登录了`)
  }

  onLogout() {
    console.log('退出')
  }
  //   监听消息
  onMessage<T>(msg: T) {
    console.log(msg)
  }
  getRobot() {
    return this.robot
  }
}

new Robot()
