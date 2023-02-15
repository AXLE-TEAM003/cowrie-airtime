<template>
  <div id="faq">
    <section class="faq-container">
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template slot="title"> What is an e- naira wallet? </template>
          <div>
            <p>
              The e-Naira wallet is a digital storage that holds the e-Naira. It
              is held and managed on a distributed ledger. The e-Naira wallet is
              required to access, hold and use e-Naira.
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            What is Cowrie’s e-naira airtime top up?
          </template>
          <div>
            <p>
              Cowrie enables its users to send a mobile recharge to a
              recipient’s pre-paid mobile phone call plan using the User’s
              e-naira payment option. Airtime top ups sent via Cowrie’s e-
              Naira’s service site is usually instant
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            What is the limit on airtime per transaction
          </template>
          <div>
            The highest amount of airtime you can send per time is N200,000.00
            via the Cowrie e- naira site
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            How long does it take for the airtime top up to be received?
          </template>
          <div>
            <p>
              Cowrie’s e- naira mobile airtime top ups are normally added
              instantly or within a few minutes. Very occasionally, there may be
              small delays due to congestion or outages on the local mobile
              network.
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            What happens if I send to an incorrect number?
          </template>
          <div>
            When sending an airtime top up, you will be asked to enter and
            confirm the recipient’s phone number twice. This is done to ensure
            that money is not sent to the wrong person because of a mistyped
            number.
            <pre></pre>
            However, if you enter the wrong number twice, the transfer will go
            ahead and there is no way to reclaim the airtime top up once it is
            sent. It is therefore important that you check the number carefully
            with your recipient before you send.
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            What happens if my e-naira wallet is debited for value, but the
            recipient fails to receive airtime value sent?
          </template>
          <div>
            <p>
              All failed airtime transactions are automatically reversed within
              1 hour of the time of debit.
            </p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <template slot="title">
            What are the security features of My e-naira wallet
          </template>
          <div>
            <p>
              Part of the security features is that Users are now required to
              create 4-digit PIN codes to approve transactions with a unique
              password/biometric (fingerprint) authentication for login and a
              PIN to authorize transactions
            </p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
