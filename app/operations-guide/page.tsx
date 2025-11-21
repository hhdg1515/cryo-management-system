import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'

export default function OperationsGuide() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">操作指南</h1>
          <p className="text-gray-600 mt-2">低温保存行业标准操作规程</p>
        </div>

        {/* 样本冷冻保存操作指南 */}
        <Card title="📦 样本冷冻保存操作规程">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 准备阶段</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>确认液氮罐温度维持在 -196°C</li>
                <li>准备好所需的冷冻管、标签、记录表</li>
                <li>检查冷冻管密封性，确保无破损</li>
                <li>佩戴好个人防护装备（低温手套、护目镜、实验服）</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 标识与记录</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>使用耐低温标签，清晰标注患者ID、样本类型、冷冻日期</li>
                <li>双人核对患者信息，确保准确无误</li>
                <li>在系统中录入样本信息，包括储存位置</li>
                <li>记录操作人员、操作时间等关键信息</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 冷冻操作</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>使用程序降温仪进行梯度降温（如适用）</li>
                <li>快速将样本转移至液氮罐中</li>
                <li>确保样本完全浸没在液氮中</li>
                <li>最小化液氮罐开启时间，减少温度波动</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 温度监控管理 */}
        <Card title="🌡️ 温度监控与维护">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 日常监控</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>每日至少检查2次液氮罐温度</li>
                <li>监控液氮液位，确保充足储备</li>
                <li>设置温度报警系统，异常时立即响应</li>
                <li>保持温度记录完整，可追溯</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 液氮补充</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>根据液位计读数，定期补充液氮</li>
                <li>补充时避免剧烈倾倒，防止样本受损</li>
                <li>记录每次补充的时间和用量</li>
                <li>保持充足的液氮储备，预防供应中断</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 异常处理</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>温度超过 -190°C 时立即启动应急预案</li>
                <li>检查液氮罐是否泄漏或故障</li>
                <li>必要时将样本转移至备用储罐</li>
                <li>详细记录异常情况及处理措施</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 样本检索与解冻 */}
        <Card title="🔍 样本检索与解冻">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 检索前准备</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>在系统中查询样本的精确位置</li>
                <li>准备好低温提篮和防护用品</li>
                <li>预先准备解冻所需的器材和溶液</li>
                <li>双人核对，确保检索正确样本</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 检索操作</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>快速准确地定位样本位置</li>
                <li>最小化液氮罐开启时间（建议＜30秒）</li>
                <li>取出样本后立即关闭罐盖</li>
                <li>检索过程中保持样本低温状态</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 解冻流程</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>根据样本类型选择合适的解冻方法</li>
                <li>常用37°C水浴快速解冻（卵子、胚胎）</li>
                <li>轻柔混匀，避免剧烈震荡</li>
                <li>解冻后立即使用或按规程处理</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 安全操作规范 */}
        <Card title="⚠️ 安全操作规范">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 个人防护</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>必须佩戴低温防护手套（双层）</li>
                <li>佩戴护目镜或面罩，防止液氮溅射</li>
                <li>穿着实验服和封闭式鞋子</li>
                <li>长发需束起，避免接触低温设备</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 环境安全</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>确保实验室通风良好，防止缺氧</li>
                <li>配备氧气监测仪，低于19.5%时报警</li>
                <li>液氮罐远离热源和易燃物品</li>
                <li>保持操作区域整洁，地面无积水</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 应急处理</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>液氮溅到皮肤：立即用大量清水冲洗</li>
                <li>发生缺氧症状：迅速转移至通风处</li>
                <li>液氮泄漏：开窗通风，人员撤离</li>
                <li>定期进行应急演练，熟悉处理流程</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 质量控制 */}
        <Card title="✅ 质量控制与审计">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 文档记录</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>所有操作必须有完整的书面或电子记录</li>
                <li>关键步骤需双人签字确认</li>
                <li>记录应包括日期、时间、操作人、核对人</li>
                <li>定期审核记录完整性和准确性</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 定期审计</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>每季度进行样本库存盘点</li>
                <li>核对系统记录与实际储存是否一致</li>
                <li>检查设备维护保养记录</li>
                <li>评估操作流程的合规性</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 持续改进</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>收集和分析操作中的问题和偏差</li>
                <li>定期更新操作规程，符合最新标准</li>
                <li>组织人员培训，提升操作技能</li>
                <li>引入新技术，优化工作流程</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 合规性要求 */}
        <Card title="📋 法规与合规性">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">1. 相关法规标准</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>《人类辅助生殖技术规范》</li>
                <li>《人类精子库基本标准和技术规范》</li>
                <li>ISO/TS 23029 生物样本库一般要求</li>
                <li>GMP（药品生产质量管理规范）相关要求</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">2. 伦理与隐私</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>获得患者知情同意，签署相关文件</li>
                <li>严格保护患者隐私信息</li>
                <li>样本使用需符合伦理审查要求</li>
                <li>建立完善的数据安全管理制度</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">3. 可追溯性</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>从样本采集到使用全程可追溯</li>
                <li>使用唯一识别码管理每个样本</li>
                <li>保存完整的操作日志和审计轨迹</li>
                <li>定期备份数据，防止丢失</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* 联系与支持 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">📞 技术支持</h3>
          <p className="text-gray-700 mb-2">
            如遇到操作问题或需要技术支持，请联系：
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>实验室主管：内线 XXX</li>
            <li>设备维护：内线 XXX</li>
            <li>质量管理：内线 XXX</li>
            <li>紧急情况：24小时热线 XXX-XXXX-XXXX</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
