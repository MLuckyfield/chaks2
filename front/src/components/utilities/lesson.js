
const Lesson = (props)=>{

  return (
    <div class="pop">
      {props.status=='final'?<label for={props.num}><div class='lesson' style={{backgroundColor:'#89CFF0'}}>{props.title}</div></label>:<label for={props.num}><div class='lesson open' style={{backgroundColor:'grey'}}>{props.title}</div></label>}
      <input type="checkbox" id={props.num} />
      <div class="modal">
        <div class="modal__inner">
                    {props.content}
                    <label class="btn-close" for={props.num}>X</label>

        </div>
      </div>
    </div>
  )
}

export default Lesson;

// CHATSHACK(以下「当社」)では、お預かりした個人情報について、以下のとおり適正かつ安全に管理・運用することに努めます。
// <br/>
// <p>１．利用目的
// 当社は、収集した個人情報について、以下の目的のために利用いたします。
// ①サービス実施、およびアフターサービスのため
// ②相談・お問い合わせへの回答のため
// ③商品・サービス・イベントの案内のため</p>
// <br/>
// <p>２．第三者提供
// 当社は、以下の場合を除いて、個人データを第三者へ提供することはしません。
// ①法令に基づく場合
// ②人の生命・身体・財産を保護するために必要で、本人から同意を得ることが難しい場合
// ③公衆衛生の向上・児童の健全な育成のために必要で、本人から同意を得ることが難しい場合
// ④国の機関や地方公共団体、その委託者などによる法令事務の遂行にあたって協力する必要があり、かつ本人の同意を得ることで事務遂行に影響が生じる可能性がある場合</p>
// <br/>
// <p>３．開示請求
// 貴殿の個人情報について、ご本人には、開示・訂正・削除・利用停止を請求する権利があります。手続きにあたっては、ご本人確認のうえ対応させていただきますが、代理人の場合も可能です。</p>
